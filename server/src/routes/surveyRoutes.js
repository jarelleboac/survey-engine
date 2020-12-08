import { Router } from 'express';
import passport from 'passport';
import {
    submissionStatus, roles, schools, schoolsArray, generalSurveyStatus,
    defaultCloseDate,
} from '../schema';
import Surveys from '../models/surveys';
import Email from '../models/Email';
import SurveyCommon from '../models/surveys/SurveyCommon';
import GeneralSurvey from '../models/GeneralSurvey';
import School from '../models/School';

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
                        return res.status(400).send(JSON.stringify({ error: 'Could not find survey. Please contact hello@percentageproject.com.' }));
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

                    return res.send(JSON.stringify({ message: 'Submitted successfully. Thank you for your participation!' }));
                } catch (err) {
                    return res.status(400).send(JSON.stringify({ error: err }));
                }
            } else {
                return res.status(400).send(JSON.stringify({ error: `This email is already listed as ${email.status}. Please contact hello@percentageproject.com.` }));
            }
        } else {
            // Handle finding the token in the GeneralSurvey models
            const generalSurvey = await GeneralSurvey.findOne({ school, token });
            if (generalSurvey) {
                // If the survey hasn't been closed yet
                if (generalSurvey.status !== generalSurveyStatus.closed) {
                    // Attempt to save the survey response
                    try {
                        // Get the school's appropriate survey model
                        const SurveyModel = Surveys.schoolsToQuestionSchemas[school];

                        if (!SurveyModel) {
                            return res.status(400).send(JSON.stringify({ error: 'Could not find survey. Please contact hello@percentageproject.com.' }));
                        }
                        // Save that model
                        const builtModel = new SurveyModel(
                            {
                                ...responses, status: submissionStatus.completed, school, general: true,
                            },
                        );

                        // Save the model to DB
                        await builtModel.save();

                        return res.send(JSON.stringify({ message: 'Submitted Successfully. Thank you for your participation!' }));
                    } catch (err) {
                        return res.status(400).send(JSON.stringify({ error: err }));
                    }
                } else {
                    return res.status(400).send(JSON.stringify({ error: 'The survey is now closed. Please contact hello@percentageproject.com with any questions.' }));
                }
            }
            return res.status(400).send(JSON.stringify({ error: 'A survey with that token and school could not be found. Please contact hello@percentageproject.com.' }));
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

/**
 * Handles getting all responses for a certain school, for percentage project admins only
 *
 * @param {req.params.school} – Expects a valid school to be attached with the string
 *
 */
router.get('/:school', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { school } = req.params;

    const { role, school: userSchool } = req.user;

    if (role === roles.percentAdmin && userSchool === schools.percentProj) {
        try {
            // Get the school's appropriate survey model
            const SurveyModel = Surveys.schoolsToQuestionSchemas[school];

            // Get all surveys from that model
            const surveys = await SurveyModel.find();
            return res.send(JSON.stringify(surveys));
        } catch (err) {
            return res.status(400).send(err.message);
        }
    } else {
        res.status(401).send(JSON.stringify({ error: 'Not authorized.' }));
    }
});

/**
 * Handle getting the date a survey closes for a particular school
 *
 * @param {req.params.school} – Expects a valid school to be attached with the body
 *
 */
router.get('/closeDate/:school', async (req, res) => {
    const { school } = req.params;

    if (schoolsArray.includes(school)) {
        try {
            const schoolDoc = await School.findOne({ school });
            if (schoolDoc) {
                return res.status(200).send(JSON.stringify({ closeDate: schoolDoc.closeDate }));
            }
            // Default to February 1 2021, 11:59 PM EST
            return res.status(200).send(JSON.stringify({ closeDate: defaultCloseDate }));
        } catch (err) {
            return res.status(400).send(err.message);
        }
    } else {
        res.status(401).send(JSON.stringify({ error: 'Not authorized.' }));
    }
});

/**
 * Handle setting a date at which to close the survey
 *
 * @param {req.params.school} – Expects a valid school to be attached with the string
 * @param {req.body.closeDate} - Expects the date
 *
 */
router.post('/closeDate/:school', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { school } = req.params;
    const { role, school: userSchool } = req.user;
    const { closeDate } = req.body;

    if (role === roles.schoolAdmin && userSchool === school && schoolsArray.includes(userSchool)) {
        try {
            // // Get the school's appropriate school model
            // const castedDate = new Date(closeDate).toISOString(); // convert to date
            // console.log(castedDate);
            // const schoolModel = await School.findOne({ school });

            // if (!schoolModel) {
            //     const newModel = new School({ closeDate: castedDate });
            //     await newModel.save();
            // }
            // else {
            //     schoolModel.closeDate = castedDate;
            //     await schoolModel.save();
            // }
            // return res.status(200).send({ closeDate });
            School.findOneAndUpdate({ school }, { closeDate }, { new: true, upsert: true }, (mongooseErr, mongooseDoc) => {
                if (mongooseErr) {
                    return res.status(400).send(mongooseErr);
                }
                const updatedDate = mongooseDoc.closeDate;
                return res.send(JSON.stringify({ closeDate: updatedDate }));
            });
        } catch (err) {
            console.log(err);
            return res.status(400).send(err.message);
        }
    } else {
        res.status(401).send(JSON.stringify({ error: 'Not authorized.' }));
    }
});

/**
 * Handles making general survey URLs if not already created. Limited to only the % project admins
 *
 */
router.post('/makeGeneralizedLinks', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { role, school } = req.user;
    if (role === roles.percentAdmin && school === schools.percentProj) {
        try {
            // Builds links for each of the schools
            const links = {};
            await Promise.all(schoolsArray.map((curSchool) => GeneralSurvey.findOne({ school: curSchool })
                .then(async (document) => {
                    if (!document) {
                        const newGeneralSurvey = new GeneralSurvey({ school: curSchool });
                        const savedSurvey = await newGeneralSurvey.save();
                        links[curSchool] = `${process.env.CORS_ORIGIN}/survey?token=${savedSurvey.token}&school=${curSchool}`;
                    } else {
                        links[curSchool] = `${process.env.CORS_ORIGIN}/survey?token=${document.token}&school=${curSchool}`;
                    }
                })
                .catch((err) => {
                    links[curSchool] = err;
                })));
            return res.send(JSON.stringify(links));
        } catch (err) {
            return res.status(400).send(err.message);
        }
    } else {
        res.status(401).send(JSON.stringify({ error: 'Not authorized.' }));
    }
});

/**
 * Handles getting count for responses collected via
 * general survey for a school for school admins
 *
 * @param {req.params.school} – Expects the school to be loaded
 *
 */
router.get('/count/:school', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { school: reqSchool } = req.params;

    const { role, school } = req.user;

    if (role === roles.schoolAdmin && reqSchool === school) {
        try {
            // Get the school's appropriate survey model
            const SurveyModel = Surveys.schoolsToQuestionSchemas[school];

            // Get all surveys from that model
            const surveys = await SurveyModel.find({ general: true });
            return res.send(JSON.stringify({ count: surveys.length }));
        } catch (err) {
            return res.status(400).send(err.message);
        }
    } else {
        res.status(401).send(JSON.stringify({ error: 'Not authorized.' }));
    }
});

export default router;
