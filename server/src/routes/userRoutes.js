import { Router } from 'express';
import { signUp, signIn } from '../utils/validation';
import { roles, schools } from '../schema';
import { parseError, sessionizeUser } from '../utils';

import User from '../models/User';

const router = Router();

// // Make a new user
// router.post('/', async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         await signUp.validateAsync({ email, password });

//         const newUser = new User({
//             email, password, role: roles.unset, school: schools.unset,
//         });
//         const sessionUser = sessionizeUser(newUser);

//         await newUser.save();

//         req.session.user = sessionUser;
//         res.send(sessionUser);
//     } catch (err) {
//         res.status(400).send(parseError(err));
//     }
// });

// Route that handles resetting password
router.post('/reset', async (req, res, next) => {
    try {
        if (req.body.email === '' || req.body.password === '' || req.body.newPassword === '') {
            next({ message: 'Please provide all parameters.' });
            return;
        }
        const { email, password, newPassword } = req.body;

        await signIn.validateAsync({ email, password: newPassword });

        const user = await User.findOne({ email });

        if (user && user.comparePasswords(password)) {
            // Modify the user's password, use the save hook to hash.
            user.password = newPassword;

            await user.save();

            res.send(JSON.stringify({ message: 'Password successfully updated.' }));
        } else {
            next({ message: 'Invalid login credentials.' });
            return;
        }
    } catch (err) {
        res.status(401).send(parseError(err));
    }
});

// router.get('/:userId', async (req, res) => {
//     const user = await User.findById(
//         req.params.userId,
//     );
//     return res.send(user);
// });

// router.post('/', async (req, res, next) => {
//     try {
//         if (req.get('X-API-KEY') !== API_KEY) {
//             res.status(401);
//             throw new Error('UnAuthorized');
//         }
//         const logEntry = new LogEntry(req.body);
//         const createdEntry = await logEntry.save();
//         res.json(createdEntry);
//     } catch (error) {
//         if (error.name === 'ValidationError') {
//             res.status(422);
//         }
//         next(error);
//     }
// });

export default router;
