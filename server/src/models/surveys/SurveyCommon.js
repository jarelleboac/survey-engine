import mongoose from 'mongoose';
import { questionSchemaToMongooseModel } from '../../utils';
import { commonQuestions, submissionStatusArray, schoolsArray } from '../../../../common/schema';

// Generate a mongoose-compatible version of the question schema
const mappedCommonQuestions = questionSchemaToMongooseModel(commonQuestions);

const surveyCommonSchema = new mongoose.Schema({
    status: {
        type: String,
        required: [true, 'Submission status is required'],
        enum: submissionStatusArray,
    },
    school: {
        type: String,
        required: [true, 'A school is required'],
        enum: schoolsArray,
    },
    ...mappedCommonQuestions,
});

const SurveyCommon = mongoose.model('SurveyCommon', surveyCommonSchema);

export default SurveyCommon;
