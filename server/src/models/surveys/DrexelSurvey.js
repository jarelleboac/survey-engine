import mongoose from 'mongoose';
import SurveyCommon from './SurveyCommon';
import { drexelQuestions } from '../../schema';
import { questionSchemaToMongooseModel } from '../../utils';

// Generate a mongoose-compatible version of the question schema
const mappedQuestions = questionSchemaToMongooseModel(drexelQuestions.customQuestions);

const drexelSurveySchema = new mongoose.Schema({
    ...mappedQuestions,
});

// Inherit the SurveyCommon model
export const DrexelSurvey = SurveyCommon.discriminator('DrexelSurvey', drexelSurveySchema);
