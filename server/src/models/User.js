const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        required: true,
    },
    password: {
        required: true,
    },
});
