import mongoose from 'mongoose';
import SurveyCommon from './SurveyCommon';
import { dukeQuestions } from '../../schema';
import { questionSchemaToMongooseModel } from '../../utils';

// Generate a mongoose-compatible version of the question schema
const mappedQuestions = questionSchemaToMongooseModel(dukeQuestions);

const dukeSurveySchema = new mongoose.Schema({
    ...mappedQuestions,
});

// Inherit the SurveyCommon model
export const DukeSurvey = SurveyCommon.discriminator('DukeSurvey', dukeSurveySchema);
