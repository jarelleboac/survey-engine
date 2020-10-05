import mongoose from 'mongoose';
import SurveyCommon from './SurveyCommon';
import { columbiaQuestions } from '../../schema';
import { questionSchemaToMongooseModel } from '../../utils';

// Generate a mongoose-compatible version of the question schema
const mappedQuestions = questionSchemaToMongooseModel(columbiaQuestions);

const columbiaSurveySchema = new mongoose.Schema({
    ...mappedQuestions,
});

// Inherit the SurveyCommon model
export const ColumbiaSurvey = SurveyCommon.discriminator('ColumbiaSurvey', columbiaSurveySchema);
