import mongoose from 'mongoose';
import { schoolsArray } from '../schema';

// Handles school-specific things such as the date that a survey should close
const schoolSchema = new mongoose.Schema({
    closeDate: {
        type: Date,
        default: new Date('2021-2-2T04:59:00'), /// Default to February 1, 11:59 PM EST
    },
    school: {
        type: String,
        required: [true, 'A school is required'],
        enum: schoolsArray,
    },
});

const School = mongoose.model('School', schoolSchema);

export default School;
