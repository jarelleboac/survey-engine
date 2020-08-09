// Creates a mapped version of the common questions schema particular to the
const questionSchemaToMongooseModel = (questions) => questions.map((question) => ({
    required: question.required,
    type: question.type ? question.type : String,
}));

module.exports = {
    questionSchemaToMongooseModel,
};
