import mongoose from 'mongoose';
import SurveyCommon from './SurveyCommon';
import { cmuQuestions } from '../../schema';
import { questionSchemaToMongooseModel } from '../../utils';

// Generate a mongoose-compatible version of the question schema
const mappedQuestions = questionSchemaToMongooseModel(cmuQuestions);

const cmuSurveySchema = new mongoose.Schema({
    ...mappedQuestions,
});

// Inherit the SurveyCommon model
export const CmuSurvey = SurveyCommon.discriminator('cmuSurvey', cmuSurveySchema);
