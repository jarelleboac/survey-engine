// Creates a mapped version of the common questions schema particular to the
export const questionSchemaToMongooseModel = (questions) => {
    const obj = {};
    questions.forEach(({ id, required, type }) => {
        obj[id] = {
            required, type,
        };
    });

    return obj;
};

export const parseError = (err) => {
    if (err.isJoi) return err.details[0];
    return JSON.stringify(err, Object.getOwnPropertyNames(err));
};

export const sessionizeUser = (user) => ({ userId: user.id, role: user.role, school: user.school });
