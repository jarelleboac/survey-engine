import mongoose from 'mongoose';
import { schoolsArray } from '../schema';

// Handles school-specific things such as the date that a survey should close
const schoolSchema = new mongoose.Schema({
    closeDate: {
        type: Date,
        default: new Date('2021-02-02T04:59:00.000Z'), // Default to February 1 2021, 11:59 PM EST
    },
    school: {
        type: String,
        required: [true, 'A school is required'],
        enum: schoolsArray,
    },
});

const School = mongoose.model('School', schoolSchema);

export default School;
