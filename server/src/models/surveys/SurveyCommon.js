const mongoose = require('mongoose');
const { commonQuestions, submissionStatus, schools } = require('../../../../common/schema');
const { questionSchemaToMongooseModel } = require('../../utils');

// Generate a mongoose-compatible version of the question schema
const mappedCommonQuestions = questionSchemaToMongooseModel(commonQuestions);

const surveyCommonSchema = new mongoose.Schema({
    status: {
        type: String,
        required: [true, 'Submission status is required'],
        enum: submissionStatus,
    },
    school: {
        type: String,
        required: [true, 'A school is required'],
        enum: schools,
    },
    ...mappedCommonQuestions,
});

const SurveyCommon = mongoose.model('SurveyCommon', surveyCommonSchema);

module.exports = {
    SurveyCommon,
};
