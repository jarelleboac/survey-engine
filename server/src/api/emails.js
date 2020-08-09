import { Router } from 'express';
import { submissionStatus } from '../../../common/schema';
import Email from '../models/Email';

const router = Router();
router.get('/', (req, res) => {
    res.send('email route sanity check');
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

export default router;
