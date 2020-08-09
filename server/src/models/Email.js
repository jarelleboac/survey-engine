import { v4 as uuidv4 } from 'uuid';

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
        required: [true, 'Submission status is required'],
        enum: submissionStatus,
    },
    token: {
        type: String,
        required: true,
        unique: true,
    },
});

// Generates a token that wil be sent in the email to just mark off emails
emailSchema.pre('save', (next) => {
    this.emailToken = uuidv4();
    next();
});

const Email = mongoose.model('Email', emailSchema);

module.exports = Email;
