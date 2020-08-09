import { Router } from 'express';
import { submissionStatus } from '../../../common/schema';
import { SurveyCommon } from '../models/surveys';
import { Email } from '../models/Email';

const router = Router();

// Logic to handle completion of the survey
router.post('/', (req, res) => {
    // Find the survey based on the email token in the route
    const emailToken = req.params.survey;
    const { status } = req.body;

    const survey = SurveyCommon.findOne({ emailToken });

    res.write('Welcome to the survey specific to this person');
    res.write(survey);
    res.end();
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
