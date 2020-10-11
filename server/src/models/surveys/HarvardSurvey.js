import mongoose from 'mongoose';
import SurveyCommon from './SurveyCommon';
import { harvardQuestions } from '../../schema';
import { questionSchemaToMongooseModel } from '../../utils';

// Generate a mongoose-compatible version of the question schema
const mappedQuestions = questionSchemaToMongooseModel(harvardQuestions);

const harvardSurveySchema = new mongoose.Schema({
    ...mappedQuestions,
});

// Inherit the SurveyCommon model
export const HarvardSurvey = SurveyCommon.discriminator('HarvardSurvey', harvardSurveySchema);
