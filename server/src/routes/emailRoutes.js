import { Router } from 'express';
import passport from 'passport';
import { submissionStatus, roles } from '../schema';
import Email from '../models/Email';
import { encrypt, decrypt, isEmail } from '../utils';
import { sendStatusEmail } from '../utils/aws';
import SenderEmail from '../models/SenderEmail';

const router = Router();
const Queue = require('bull');
// 1. Initiating the Queue
const sendMailQueue = new Queue('sendMail', {
    redis: {
    host: '127.0.0.1',
    port: 6379,
    password: 'root'
}
});


const { CORS_ORIGIN } = process.env;

function chunkArray(array, size) {
    let result = []
    let arrayCopy = [...array]
    while (arrayCopy.length > 0) {
        result.push(arrayCopy.splice(0, size))
    }
    return result
}

router.get('/:school', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { role, school } = req.user;

    if (role === roles.schoolAdmin && school === req.params.school) {
        Email.find({ school: req.params.school })
            .then((emails) => {
                let unsent = 0;
                let sent = 0;
                let inprogress = 0;
                let completed = 0;
                for (let i = 0; i < emails.length; i += 1) {
                    switch (emails[i].status) {
                    case submissionStatus.unsent:
                        unsent += 1;
                        break;
                    case submissionStatus.sent:
                        sent += 1;
                        break;
                    case submissionStatus.inProgress:
                        inprogress += 1;
                        break;
                    case submissionStatus.completed:
                        completed += 1;
                        break;
                    default:
                        break;
                    }
                }
                const total = unsent + sent + inprogress + completed;
                const counts = {
                    total, unsent, sent, inprogress, completed,
                };
                res.send(JSON.stringify(counts));
            })
            .catch((err) => res.status(400).send(JSON.stringify({ error: err.message })));
    } else {
        res.status(401).send(JSON.stringify({ error: 'Not authorized.' }));
    }
});

/**
 * Unsubscribes a user from future emails
 *
 * @param {req.body.token} – Expects the email token
 *
 */
router.post('/unsubscribe', async (req, res) => {
    const { token } = req.body;

    try {
        // Find the email by the token
        const email = await Email.findOne({ token });
        if (email) {
            email.status = submissionStatus.unsubscribed;
            await email.save();
            return res.status(200).send(JSON.stringify({ message: 'You have been successfully unsubscribed.' }));
        }
        return res.status(400).send(JSON.stringify({ error: 'Could not unsubscribe. Please contact hello@percentageproject.com' }));
    } catch (err) {
        return res.status(400).send(JSON.stringify({ error: err.message }));
    }
});

// Expects email to be an array of valid emails. Allows adding emails to that school
router.post('/:school', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    const { role, school } = req.user;

    const { emails } = req.body;

    if (role === roles.schoolAdmin && school === req.params.school) {
        let count = 0;
        let invalid = 0;
        let duplicates = 0;
        try {
            // Try to get all emails
            const allSchoolEmails = await Email.find({ school }, (err, docs) => {
                if (!err) {
                    return docs;
                }
                res.status(400).send(JSON.stringify({ error: err.message }));
                next();
            });

            // Decrypt all emails
            const decryptedEmails = allSchoolEmails.map((model) => decrypt(model.email));

            for (let i = 0; i < emails.length; i += 1) {
                if (isEmail(emails[i])) {
                    // Only add the email if it doesn't exist already in decrypted email
                    if (decryptedEmails.indexOf(emails[i]) === -1) {
                        const encrypted = encrypt(emails[i]);
                        const emailModel = new Email(
                            { email: encrypted, school, status: submissionStatus.unsent },
                        );

                        emailModel.save();
                        count += 1;
                    } else {
                        duplicates += 1;
                    }
                } else {
                    invalid += 1;
                }
            }
        } catch (err) {
            return res.status(400).send({ error: err.message });
        }

        return res.send({ message: `${count} successfully added to ${school}. ${invalid} were invalid. There were ${duplicates} duplicates.` });
    }
    // next({ message: 'Not authorized.' });
});

/**
 * sendAllEmails route for a specific school. Should include the requestType in the body
 *
 */
router.post('/:school/sendEmails', passport.authenticate('jwt', { session: false }), async (req, res) => {
    // need to validate emails as well
    const { school } = req.params;

    const { role, school: userSchool } = req.user;

    const { requestType } = req.body;

    if (role === roles.schoolAdmin && userSchool === school) {
        // Find emails e.g. type school: BROWN, status: UNSENT
        const emails = await Email.find({ school, status: requestType });
        
        const decryptedEmails = emails.map((model) => (
            { model, token: model.token, email: decrypt(model.email) }
        ));
        
        const chunkedDecryptedEmails = chunkArray(decryptedEmails, 2);

        const senderEmail = await SenderEmail.findOne({ school });
        if (!senderEmail) {
            return res.status(400).send(JSON.stringify({ error: 'Please set a sender email first.' }));
        }

        for (let index = 0; index < chunkedDecryptedEmails.length; index++) {
            const data = {
                senderEmail: senderEmail,
                emails: chunkedDecryptedEmails[index],
                requestType: requestType,
                school: school, 
              };
              const options = {
                delay: 1 + 6*((index)*10000), // 1 min in ms
              };
              
            // 2. Adding a Job to the Queue
            sendMailQueue.add(data, options);  
            sendMailQueue.process(async job => { 
            try{
                return await sendMail(job.data.emails, job.data.senderEmail, job.data.requestType, job.data.school); 
            }
            catch (ex) {
                console.log(ex);
                job.moveToFailed();
            }
            });
        }
    } else {
        return res.status(401).send(JSON.stringify({ error: 'Not authorized.' }));
    }

    return res.send({ message: `Sending emails` });
});

function sendMail(emails, senderEmail, requestType, school){
    // Counts success and failure emails
    let count = 0;
    let error = 0;
    console.log("MAPS")
    console.log(emails)
    return new Promise.all(emails.map((email) => {
        // Make a survey URL for the thing that we need
        const surveyUrl = `${CORS_ORIGIN}/survey?token=${email.token}&school=${school}`;
        const unsubscribeUrl = `${CORS_ORIGIN}/unsubscribe?token=${email.token}`;
        
        return sendStatusEmail(email, requestType, surveyUrl, school, senderEmail.email, unsubscribeUrl)
            .then(async (data) => {
                // Set it to sent if it hasn't already been sent
                if (email.model.status !== submissionStatus.sent) {
                    // eslint-disable-next-line no-param-reassign
                    email.model.status = submissionStatus.sent;
                    await email.model.save();
                }
                count += 1;
            })
            .catch((err) => {
                console.log(err);
                error += 1
            });
    }))
}

/**
 * Changes the email from which emails will be sent for a certain school
 *
 */
router.post('/:school/changeSenderEmail', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { school } = req.params;

    const { role, school: userSchool } = req.user;

    const { email } = req.body;

    if (role === roles.schoolAdmin && userSchool === school) {
        // Makes sure email is valid before continuing
        if (!isEmail(email)) {
            return res.status(400).send(JSON.stringify({ error: 'Invalid email.' }));
        }

        SenderEmail.findOne({ school }).then(async (document) => {
            // If the model didn't exist before, make a new model for this school
            if (!document) {
                const newSenderEmail = new SenderEmail({ email, school });
                await newSenderEmail.save();
            } else {
                // eslint-disable-next-line no-param-reassign
                document.email = email;
                await document.save();
            }
        });
    } else {
        return res.status(401).send(JSON.stringify({ error: 'Not authorized.' }));
    }

    return res.send(JSON.stringify({ message: `Sender email successfully updated to ${email}` }));
});

export default router;

// /**
//  * Update a single email's status. Expects the emailToken and status in the body.
//  */
// router.post('/updateEmailStatus', passport.authenticate('jwt'), async (req, res) => {
//     const { emailToken, status } = req.body;

//     // Should validate email before continuing

//     // Find the email by the token
//     const email = await Email.findOne({ token: emailToken });

//     // Update status and save
//     if (email.status !== submissionStatus.completed) {
//         email.status = status;
//         await email.save();

//         return res.json({ message: `${emailToken} successfully updated to ${status}`, status: email.status });
//     }
//     return res.status(400).send(`This email is already listed as ${submissionStatus.completed}.`);
// });

// router.get('/decrypt', async (req, res) => {
//     const allEmails = await Email.find();
//     allEmails.forEach((email) => {
//         console.log(email.email);
//         console.log(decrypt(email.email));
//     });
// });
