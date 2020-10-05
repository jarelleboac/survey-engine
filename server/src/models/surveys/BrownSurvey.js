import mongoose from 'mongoose';
import SurveyCommon from './SurveyCommon';
import { brownQuestions } from '../../schema';
import { questionSchemaToMongooseModel } from '../../utils';

// Generate a mongoose-compatible version of the question schema
const mappedQuestions = questionSchemaToMongooseModel(brownQuestions);

const brownSurveySchema = new mongoose.Schema({
    ...mappedQuestions,
});

// Inherit the SurveyCommon model
export const BrownSurvey = SurveyCommon.discriminator('BrownSurvey', brownSurveySchema);
