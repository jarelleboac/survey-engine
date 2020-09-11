import { Router } from 'express';
import { submissionStatus } from '../schema';
import Surveys from '../models/surveys';
import Email from '../models/Email';
import SurveyCommon from '../models/surveys/SurveyCommon';

const router = Router();

/**
 * Handles completing a single survey
 *
 * @param {req.body.school} – Expects the school
 * @param {req.body.emailToken} – Expects the email token
 * @param {req.body.responses} – Expects the responses in the correct school format
 *
 */
router.post('/', async (req, res) => {
    const { school, emailToken, responses } = req.body;

    // Should validate email before continuing
    try {
        // Find the email by the token
        const email = await Email.findOne({ token: emailToken });

        // Only proceed if email is not yet marked at complete
        if (email.status !== submissionStatus.completed) {
            // Attempt to save the survey response
            try {
                // Get the school's appropriate survey model
                const SurveyModel = Surveys.schoolsToQuestionSchemas[school];

                // Save that model
                const builtModel = new SurveyModel(
                    { ...responses, status: submissionStatus.completed, school },
                );

                await builtModel.save();
                email.status = submissionStatus.completed;
                await email.save();
                return res.send(`Successfully wrote a new response to ${school}.`);
            } catch (err) {
                return res.status(400).send(err.message);
            }
        } else {
            return res.status(400).send(`This email is already listed as ${email.status}.`);
        }
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
