// import { Router } from 'express';

// import User from '../models/User';

// const router = Router();

// // router.get('/', async (req, res, next) => res.send('hey foo'),
// //     // try {
// //     //     const users = await User.find();
// //     //     return res.json(users);
// //     // } catch (error) {
// //     //     next(error);
// //     // }
// // );

// // router.post('/', async (req, res, next) => {
// //     try {
// //         if (req.get('X-API-KEY') !== API_KEY) {
// //             res.status(401);
// //             throw new Error('UnAuthorized');
// //         }
// //         const logEntry = new LogEntry(req.body);
// //         const createdEntry = await logEntry.save();
// //         res.json(createdEntry);
// //     } catch (error) {
// //         if (error.name === 'ValidationError') {
// //             res.status(422);
// //         }
// //         next(error);
// //     }
// // });

// export default router;

const express = require('express');

const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});
// define the home page route
router.get('/', (req, res) => {
    res.send('Birds home page');
});
// define the about route
router.get('/about', (req, res) => {
    res.send('About birds');
});

module.exports = router;
