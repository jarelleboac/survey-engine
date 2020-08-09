const mongoose = require('mongoose');
const { schools, submissionStatus } = require('../../../common/schema');

// Email schema that has no linkage to the survey itself
const emailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    school: {
        type: String,
        required: [true, 'A school is required'],
        enum: schools,
    },
    status: {
        type: String,
        required: [true, 'Submissions status is required'],
        enum: submissionStatus,
    },
});

const Email = mongoose.model('Email', emailSchema);

module.exports = Email;
