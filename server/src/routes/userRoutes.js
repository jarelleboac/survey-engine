import { Router } from 'express';

import User from '../models/User';

const router = Router();

const testUser = {
    email: 'foo@gmail.com',
    password: 'password123',
    school: 'BROWN',
    role: 'SCHOOL_ADMIN',
};

router.get('/', async (req, res, next) => {
    try {
        const users = await User.find();
        return res.json(users);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    const user = new User(req.body);
    console.log(req.body);
    try {
        await user.save();
        res.send(`Created user with the email ${user.error}`);
    } catch (error) {
        next(error);
    }
});

router.get('/:userId', async (req, res) => {
    const user = await User.findById(
        req.params.userId,
    );
    return res.send(user);
});

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
