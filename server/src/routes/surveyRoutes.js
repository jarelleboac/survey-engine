import { Router } from 'express';
import passport from 'passport';
import { submissionStatus, roles, schools } from '../schema';
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
    const { school, token, responses } = req.body;

    // Should validate email before continuing
    try {
        // Find the email by the token
        const email = await Email.findOne({ school, token });
        if (email) {
            // Only proceed if email is not yet marked as complete
            if (email.status !== submissionStatus.completed) {
                // Attempt to save the survey response
                try {
                // Get the school's appropriate survey model
                    const SurveyModel = Surveys.schoolsToQuestionSchemas[school];

                    if (!SurveyModel) {
                        return res.status(400).send(JSON.stringify({ error: 'This school\'s model has not been implemented.' }));
                    }
                    // Save that model
                    const builtModel = new SurveyModel(
                        { ...responses, status: submissionStatus.completed, school },
                    );

                    // Save the model to DB
                    await builtModel.save();

                    // Mark email as completed and then save it
                    email.status = submissionStatus.completed;
                    await email.save();

                    return res.send(JSON.stringify({ message: `Successfully wrote a new response to ${school}.` }));
                } catch (err) {
                    return res.status(400).send(JSON.stringify({ error: err }));
                }
            } else {
                return res.status(400).send(JSON.stringify({ error: `This email is already listed as ${email.status}.` }));
            }
        } else {
            return res.status(400).send(JSON.stringify({ error: 'Could not submit survey. Please contact hello@percentageproject.com.' }));
        }
    } catch (err) {
        return res.status(400).send(JSON.stringify({ error: err.message }));
    }
});

/**
 * Handles getting all responses. Limited to only the % project admins
 *
 */
router.get('/allResponses', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { role, school } = req.user;
    if (role === roles.percentAdmin && school === schools.percentProj) {
        try {
            // Finds all emails based on the basic model; should fetch all from the DB
            const surveys = await SurveyCommon.find();
            return res.send(surveys);
        } catch (err) {
            return res.status(400).send(err.message);
        }
    } else {
        res.status(401).send(JSON.stringify({ error: 'Not authorized.' }));
    }
});

// /**
//  * Handles getting all responses for a certain school for school admins
//  *
//  * @param {req.params.school} – Expects the school to be loaded
//  *
//  */
// router.get('/:school', passport.authenticate('jwt', { session: false }), async (req, res) => {
//     const { school: reqSchool } = req.params;

//     const { role, school } = req.user;

//     if (role === roles.schoolAdmin && reqSchool === school) {
//         try {
//             // Get the school's appropriate survey model
//             const SurveyModel = Surveys.schoolsToQuestionSchemas[school];

//             // Get all surveys from that model
//             const surveys = await SurveyModel.find();
//             return res.send(JSON.stringify(surveys));
//         } catch (err) {
//             return res.status(400).send(err.message);
//         }
//     } else {
//         res.status(401).send(JSON.stringify({ error: 'Not authorized.' }));
//     }
// });

export default router;
