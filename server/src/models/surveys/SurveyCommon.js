import mongoose from 'mongoose';
import { questionSchemaToMongooseModel } from '../../utils';
import { commonQuestions, submissionStatusArray, schoolsArray } from '../../schema';

// Generate a mongoose-compatible version of the question schema
const mappedCommonQuestions = questionSchemaToMongooseModel(commonQuestions);

const currentESTDateTime = {
    // add the timestamp, set as the server side EST current time
    timestamps: { currentTime: () => new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }) },
};

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
    general: {
        type: Boolean,
        required: [true, 'Generalized link must be set.'],
        default: false,
    },
    ...mappedCommonQuestions,
}, currentESTDateTime);

const SurveyCommon = mongoose.model('SurveyCommon', surveyCommonSchema);

export default SurveyCommon;
