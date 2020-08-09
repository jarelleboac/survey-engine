import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';
import { schoolsArray, submissionStatusArray } from '../../../common/schema';

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
        enum: schoolsArray,
    },
    status: {
        type: String,
        required: [true, 'Submission status is required'],
        enum: submissionStatusArray,
    },
    token: {
        type: String,
        unique: true,
    },
});

// Generates a token that wil be sent in the email to just mark off emails
// TODO: this should also manage validating that the email is legitimate
emailSchema.pre('save', function (next) {
    // Only sets a token if there was none previously
    if (!this.token) {
        this.token = uuidv4();
    }

    next();
});

const Email = mongoose.model('Email', emailSchema);

export default Email;
