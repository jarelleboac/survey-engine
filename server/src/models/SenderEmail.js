import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';
import { schoolsArray } from '../schema';

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
        unique: true,
    },
});

/**
 * Generates a token that wil be sent in the email to just mark off emails
 */

// eslint-disable-next-line func-names
emailSchema.pre('save', function (next) {
    // Only sets a token if there was none previously
    if (!this.token) {
        this.token = uuidv4();
    }

    next();
});

const SenderEmail = mongoose.model('SenderEmail', emailSchema);

export default SenderEmail;
