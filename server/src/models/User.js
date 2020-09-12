import mongoose from 'mongoose';
import { compareSync, hashSync } from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
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
    userId: {
        type: String,
        unique: true,
    },
});

// eslint-disable-next-line func-names
userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.password = hashSync(this.password, 10);
    }
    // Only sets a token if there was none previously
    if (!this.userId) {
        this.userId = uuidv4();
    }
    next();
});

userSchema.statics.doesNotExist = async (field) => await this.where(field).countDocuments() === 0;

// eslint-disable-next-line func-names
userSchema.methods.comparePasswords = function (password) {
    return compareSync(password, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
