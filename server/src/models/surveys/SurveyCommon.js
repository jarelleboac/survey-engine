const mongoose = require('mongoose');
const { commonQuestions } = require('../../../../common/schema');
const { questionSchemaToMongooseModel } = require('../../utils');

// Generate a mongoose-compatible version of the question schema
const mappedCommonQuestions = questionSchemaToMongooseModel(commonQuestions);

const surveyCommonSchema = new mongoose.Schema({
    ...mappedCommonQuestions,
});

const SurveyCommon = mongoose.model('SurveyCommon', surveyCommonSchema);

module.exports = {
    SurveyCommon,
};
