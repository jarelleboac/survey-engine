import express from 'express';

import User from '../models/User';
import { signIn, parseError, sessionizeUser } from '../utils/validation';

const { SESS_NAME } = process.env;

const sessionRouter = express.Router();

// Login route that will make the session for the user if login was sucessful
sessionRouter.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;
        await signIn.validate({ email, password });
        const user = await User.findOne({ email });

        if (user && user.comparePasswords(password)) {
            const sessionUser = sessionizeUser(user);
            req.session.user = sessionUser;
            res.send(sessionUser);
        } else {
            throw new Error('Invalid login credentials');
        }
    } catch (err) {
        res.status(401).send(parseError(err));
    }
});

// Handles logging out
sessionRouter.delete('', ({ session }, res) => {
    try {
        const { user } = session;
        if (user) {
            session.destroy((err) => {
                if (err) throw (err);
                res.clearCookie(SESS_NAME);
                res.send(user);
            });
        } else {
            throw new Error('Something went wrong');
        }
    } catch (err) {
        res.status(422).send(parseError(err));
    }
});

// This checks if a user is logged in or not. It will either be the user or undefined.
sessionRouter.get('', ({ session: { user } }, res) => {
    res.send({ user });
});

export default sessionRouter;
