import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';
import { schoolsArray, generalSurveyStatus } from '../schema';

// Generalized survey link schema
const generalSurveySchema = new mongoose.Schema({
    school: {
        type: String,
        required: [true, 'A school is required'],
        enum: schoolsArray,
        unique: true,
    },
    status: {
        type: String,
        required: [true, 'Submission status is required'],
        enum: Object.values(generalSurveyStatus),
        default: generalSurveyStatus.unsent,
    },
    token: {
        type: String,
        unique: true,
    },
});

/**
 * Generates a token that wil be sent in the email to just mark off emails
 */

// eslint-disable-next-line func-names
generalSurveySchema.pre('save', function (next) {
    // Only sets a token if there was none previously
    if (!this.token) {
        this.token = uuidv4();
    }

    next();
});

const GeneralSurvey = mongoose.model('GeneralSurvey', generalSurveySchema);

export default GeneralSurvey;
