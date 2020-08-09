import { Router } from 'express';
import { submissionStatus } from '../../../common/schema';
import Surveys from '../models/surveys';
import { Email } from '../models/Email';
import SurveyCommon from '../models/surveys/SurveyCommon';

const router = Router();

/**
 * Handles completing a single survey
 *
 * @param {req.body.status} – Expects the completion status of the survey itself
 * @param {req.body.school} – Expects the school
 * @param {req.body.responses} – Expects the responses in the correct school format
 *
 */
router.post('/', async (req, res) => {
    const { school, emailToken, responses } = req.body;

    // Should validate email before continuing

    try {
        // Find the email by the token
        const email = await Email.findOne({ token: emailToken });

        // Update status to completed
        if (email.status !== submissionStatus.completed) {
            email.status = submissionStatus.completed;
            await email.save();
        } else {
            return res.status(400).send(`This email is already listed as ${email.status}.`);
        }
    } catch (err) {
        return res.status(400).send(err.message);
    }

    // If the above succeeded up to here, then attempt to save the survey response
    try {
        // Get the school's appropriate survey model
        const SurveyModel = Surveys.schoolsToQuestionSchemas[school];

        // Save to that model
        await SurveyModel.save(responses);
        return res.send(`Successfully wrote a new response to ${school}.`);
    } catch (err) {
        return res.status(400).send(err.message);
    }
});

/**
 * Handles getting all responses.
 *
 */
router.get('/', async (req, res) => {
    // TODO: this needs %proj admin perms
    try {
        const surveys = await SurveyCommon.find();
        return res.send(surveys);
    } catch (err) {
        return res.status(400).send(err.message);
    }
});

/**
 * Handles getting all responses
 *
 * @param {req.params.school} – Expects the school to be loaded
 *
 */
router.get('/:school', async (req, res) => {
    // TODO: this needs school admin perms
    const { school } = req.params;

    try {
        // Get the school's appropriate survey model
        const SurveyModel = Surveys.schoolsToQuestionSchemas[school];

        // Get all surveys from that model
        const surveys = await SurveyModel.find();
        return res.send(surveys);
    } catch (err) {
        return res.status(400).send(err.message);
    }
});

export default router;
