import mongoose from 'mongoose';
import SurveyCommon from './SurveyCommon';
import { umdQuestions } from '../../schema';
import { questionSchemaToMongooseModel } from '../../utils';

// Generate a mongoose-compatible version of the question schema
const mappedQuestions = questionSchemaToMongooseModel(umdQuestions.customQuestions);

const umdSurveySchema = new mongoose.Schema({
    ...mappedQuestions,
});

// Inherit the SurveyCommon model
export const UmdSurvey = SurveyCommon.discriminator('UmdSurvey', umdSurveySchema);
