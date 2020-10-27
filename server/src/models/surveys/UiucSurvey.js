import mongoose from 'mongoose';
import SurveyCommon from './SurveyCommon';
import { uiucQuestions } from '../../schema';
import { questionSchemaToMongooseModel } from '../../utils';

// Generate a mongoose-compatible version of the question schema
const mappedQuestions = questionSchemaToMongooseModel(uiucQuestions.customQuestions);

const uiucSurveySchema = new mongoose.Schema({
    ...mappedQuestions,
});

// Inherit the SurveyCommon model
export const UiucSurvey = SurveyCommon.discriminator('UiucSurvey', uiucSurveySchema);
