import mongoose from 'mongoose';
import SurveyCommon from './SurveyCommon';
import { rutgersQuestions } from '../../schema';
import { questionSchemaToMongooseModel } from '../../utils';

// Generate a mongoose-compatible version of the question schema
const mappedQuestions = questionSchemaToMongooseModel(rutgersQuestions.customQuestions);

const rutgersSurveySchema = new mongoose.Schema({
    ...mappedQuestions,
});

// Inherit the SurveyCommon model
export const RutgersSurvey = SurveyCommon.discriminator('RutgersSurvey', rutgersSurveySchema);
