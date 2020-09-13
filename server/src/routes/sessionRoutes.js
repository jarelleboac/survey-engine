import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { signIn } from '../utils/validation';
import { parseError, sessionizeUser } from '../utils';

const { SESS_NAME } = process.env;

const sessionRouter = express.Router();

// Login route that will make the session for the user if login was successful
sessionRouter.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;
        await signIn.validateAsync({ email, password });
        User.findOne({ email }).then((user) => {
            // Check if user exists
            if (!user) {
                throw new Error('Email not found');
            }

            if (user.comparePasswords(password)) {
                const sessionUser = sessionizeUser(user);
                req.session.user = sessionUser;

                const payload = {
                    id: user.userId,
                };

                jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    {
                        expiresIn: 900, // 15 mins
                    },
                    (err, token) => {
                        res.send(JSON.stringify({ session: sessionUser, token: `${token}` }));
                    },
                );
            } else {
                throw new Error('Invalid login credentials');
            }
        });
    } catch (err) {
        res.status(401).send(parseError(err));
    }
});

// Handles logging out
sessionRouter.delete('/', (req, res) => {
    try {
        const { user } = req.session;
        if (user) {
            req.session = null;
            res.clearCookie(SESS_NAME);
            res.send(user);
        } else {
            throw new Error('Something went wrong');
        }
    } catch (err) {
        res.status(422).send(parseError(err));
    }
});

// This checks if a user is logged in or not. It will either be the user or undefined.
sessionRouter.get('/', ({ session: { user } }, res) => {
    res.send(JSON.stringify({ user }));
});

export default sessionRouter;
