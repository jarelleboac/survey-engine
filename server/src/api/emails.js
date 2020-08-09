import { Router } from 'express';
import { submissionStatus } from '../../../common/schema';
import Email from '../models/Email';

const router = Router();

// TODO: remove this once testing is over
router.get('/', (req, res) => {
    res.send('email route sanity check');
});

/**
 * Update a single email's status. Expects the emailToken and status in the body.
 */
router.post('/updateEmailStatus', async (req, res) => {
    const { emailToken, status } = req.body;

    // Should validate email before continuing

    // Find the email by the token. Update status and save.
    const email = Email.findOne({ token: emailToken });
    email.status = status;
    await email.save();

    res.send(`${emailToken} successfully updated to ${status}`);
});

// TODO: this really needs to be admin-only for the specific school
router.get('/:school', async (req, res) => {
    const emails = await Email.find({ school: req.params.school });
    res.send(emails);
});

// Expects email to be an array of valid emails
router.post('/:school', async (req, res) => {
    const { emails } = req.body;
    console.log(emails);
    // need to validate emails as well
    const { school } = req.params;
    emails.forEach(async (email) => {
        const emailModel = new Email({ email, school, status: submissionStatus[0] });
        await emailModel.save();
    });
    res.send(`${emails.length} successfully added to ${school}`);
});

// TODO: sendEmails route for a specific school
// Expects email to be an array of valid emails
router.post('/:school/sendEmails', async (req, res) => {
    const { emails } = req.body;

    // need to validate emails as well
    const { school } = req.params;
    res.send('Not yet implemented');
    // emails.forEach(async (email) => {
    //     const emailModel = new Email({ email, school, status: submissionStatus[0] });
    //     await emailModel.save();
    // });
    // res.send(`${emails.length} successfully added to ${school}`);
});

// TODO: sendAllEmails route for a specific school.
router.post('/:school/sendAllEmails', async (req, res) => {
    // need to validate emails as well
    const { school } = req.params;
    res.send('Not yet implemented');
    // emails.forEach(async (email) => {
    //     const emailModel = new Email({ email, school, status: submissionStatus[0] });
    //     await emailModel.save();
    // });
    // res.send(`${emails.length} successfully added to ${school}`);
});

export default router;
