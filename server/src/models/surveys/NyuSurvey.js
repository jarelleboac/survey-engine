import mongoose from 'mongoose';
import SurveyCommon from './SurveyCommon';
import { nyuQuestions } from '../../schema';
import { questionSchemaToMongooseModel } from '../../utils';

// Generate a mongoose-compatible version of the question schema
const mappedQuestions = questionSchemaToMongooseModel(nyuQuestions.customQuestions);

const nyuSurveySchema = new mongoose.Schema({
    ...mappedQuestions,
});

// Inherit the SurveyCommon model
export const NyuSurvey = SurveyCommon.discriminator('NyuSurvey', nyuSurveySchema);
