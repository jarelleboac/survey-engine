import mongoose from 'mongoose';
import { schools, roles } from '../../../common/schema';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    password: {
        type: String,
        required: [true, 'A password is required'],
    },
    school: {
        type: String,
        required: [true, 'A school is required'],
        enum: schools,
    },
    role: {
        type: String,
        required: [true, 'A valid role is required'],
        enum: roles,
    },
});

const User = mongoose.model('User', userSchema);

export default User;
