// Creates a mapped version of the common questions schema particular to the
const questionSchemaToMongooseModel = (questions) => {
    const obj = {};
    questions.forEach(({ id, required, type }) => {
        obj[id] = {
            required, type,
        };
    });

    return obj;
};

module.exports = {
    questionSchemaToMongooseModel,
};
