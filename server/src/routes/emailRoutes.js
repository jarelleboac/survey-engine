import { Router } from 'express';
import passport from 'passport';
import { submissionStatus, roles } from '../schema';
import Email from '../models/Email';
import { encrypt, decrypt, isEmail } from '../utils';

const router = Router();

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

// // TODO: sendEmails route for a specific school
// // Expects email to be an array of valid emails
// router.post('/:school/sendEmails', async (req, res) => {
//     const { emails } = req.body;

//     // need to validate emails as well
//     const { school } = req.params;
//     res.send('Not yet implemented');
// });

// /**
//  * TODO: sendAllEmails route for a specific school. Will send out reminders to all complete surveys
//  *
//  */
// router.post('/:school/sendAllEmails', async (req, res) => {
//     // need to validate emails as well
//     const { school } = req.params;
//     res.send('Not yet implemented');
// });

export default router;
