import SurveyCommon from './SurveyCommon';

const mongoose = require('mongoose');

const { brownQuestions } = require('../../../../common/schema');
const { questionSchemaToMongooseModel } = require('../../utils');

// Generate a mongoose-compatible version of the question schema
const mappedQuestions = questionSchemaToMongooseModel(brownQuestions);

const brownSurveySchema = new mongoose.Schema({
    ...mappedQuestions,
});

// Inherit the SurveyCommon model
const BrownSurvey = SurveyCommon.discriminator('BrownSurvey', brownSurveySchema);

module.exports = {
    BrownSurvey,
};
