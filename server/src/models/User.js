import mongoose from 'mongoose';
import { schoolsArray, rolesArray } from '../schema';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'A password is required'],
    },
    school: {
        type: String,
        required: [true, 'A school is required'],
        enum: schoolsArray,
    },
    role: {
        type: String,
        required: [true, 'A valid role is required'],
        enum: rolesArray,
    },
});

const User = mongoose.model('User', userSchema);

export default User;
