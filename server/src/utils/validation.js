import Joi from 'joi';

const email = Joi.string().email().required();

const password = Joi.string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'));

export const signUp = Joi.object({
    email, password,
});

export const signIn = Joi.object({
    email, password,
});
