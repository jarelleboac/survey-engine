import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { signIn } from '../utils/validation';
import { parseError, sessionizeUser } from '../utils';

const { SESS_NAME } = process.env;

const sessionRouter = express.Router();

// Login route that will make the session for the user if login was successful
sessionRouter.post('/', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        await signIn.validateAsync({ email, password });
        User.findOne({ email }).then((user) => {
            // Check if user exists
            if (!user) {
                next({ message: 'Email not found' });
                return;
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
                        expiresIn: 60 * 60, // 60 mins
                    },
                    (err, token) => {
                        res.send(JSON.stringify({ session: sessionUser, token: `${token}` }));
                    },
                );
            } else {
                next({ message: 'Invalid login credentials' });
            }
        });
    } catch (err) {
        next(parseError(err));
    }
});

// Handles logging out
sessionRouter.delete('/', (req, res, next) => {
    try {
        const { user } = req.session;
        if (user) {
            req.session = null;
            res.clearCookie(SESS_NAME);
            res.send(user);
        } else {
            next('Something went wrong logging out');
            return;
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
