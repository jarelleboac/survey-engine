import mongoose from 'mongoose';
import SurveyCommon from './SurveyCommon';
import { pennQuestions } from '../../schema';
import { questionSchemaToMongooseModel } from '../../utils';

// Generate a mongoose-compatible version of the question schema
const mappedQuestions = questionSchemaToMongooseModel(pennQuestions.customQuestions);

const pennSurveySchema = new mongoose.Schema({
    ...mappedQuestions,
});

// Inherit the SurveyCommon model
export const PennSurvey = SurveyCommon.discriminator('PennSurvey', pennSurveySchema);
