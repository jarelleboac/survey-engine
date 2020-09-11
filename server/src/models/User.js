import mongoose from 'mongoose';
import { compareSync, hashSync } from 'bcryptjs';
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

// eslint-disable-next-line func-names
userSchema.pre('save', function () {
    if (this.isModified('password')) {
        this.password = hashSync(this.password, 10);
    }
});

userSchema.statics.doesNotExist = async (field) => await this.where(field).countDocuments() === 0;

userSchema.methods.comparePasswords = (password) => compareSync(password, this.password);

const User = mongoose.model('User', userSchema);

export default User;
