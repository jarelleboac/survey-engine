import mongoose from 'mongoose';
import SurveyCommon from './SurveyCommon';
import { vanderbiltQuestions } from '../../schema';
import { questionSchemaToMongooseModel } from '../../utils';

// Generate a mongoose-compatible version of the question schema
const mappedQuestions = questionSchemaToMongooseModel(vanderbiltQuestions);

const vanderbiltSurveySchema = new mongoose.Schema({
    ...mappedQuestions,
});

// Inherit the SurveyCommon model
export const VanderbiltSurvey = SurveyCommon.discriminator('VanderbiltSurvey', vanderbiltSurveySchema);
