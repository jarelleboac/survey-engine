import { Router } from 'express';
import { submissionStatus } from '../schema';
import Email from '../models/Email';

const router = Router();

/**
 * Update a single email's status. Expects the emailToken and status in the body.
 */
router.post('/updateEmailStatus', async (req, res) => {
    const { emailToken, status } = req.body;

    // Should validate email before continuing

    // Find the email by the token
    const email = await Email.findOne({ token: emailToken });

    // Update status and save
    if (email.status !== submissionStatus.completed) {
        email.status = status;
        await email.save();

        return res.json({ message: `${emailToken} successfully updated to ${status}`, status: email.status });
    }
    return res.status(400).send(`This email is already listed as ${submissionStatus.completed}.`);
});

// TODO: this really needs to be admin-only for the specific school
router.get('/:school', async (req, res) => {
    const emails = await Email.find({ school: req.params.school });
    res.send(JSON.stringify(emails));
});

// Expects email to be an array of valid emails
router.post('/:school', async (req, res) => {
    const { emails } = req.body;
    // need to validate emails as well
    const { school } = req.params;
    try {
        for (let i = 0; i < emails.length; i += 1) {
            const emailModel = new Email(
                { email: emails[i], school, status: submissionStatus.unsent },
            );
            // eslint-disable-next-line no-await-in-loop
            await emailModel.save();
        }
    } catch (err) {
        return res.status(400).send({ error: err.message });
    }

    return res.send(`${emails.length} successfully added to ${school}`);
});

// TODO: sendEmails route for a specific school
// Expects email to be an array of valid emails
router.post('/:school/sendEmails', async (req, res) => {
    const { emails } = req.body;

    // need to validate emails as well
    const { school } = req.params;
    res.send('Not yet implemented');
});

/**
 * TODO: sendAllEmails route for a specific school. Will send out reminders to all complete surveys
 *
 */
router.post('/:school/sendAllEmails', async (req, res) => {
    // need to validate emails as well
    const { school } = req.params;
    res.send('Not yet implemented');
});

export default router;
