// Allow pulling in environment variables across the application
import 'dotenv/config';

import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session';
import connectStore from 'connect-mongo';
import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import User from './models/User';

// Import our routes and middlewares
import {
    userRoutes, emailRoutes, surveyRoutes, sessionRoutes,
} from './routes';
import middlewares from './middlewares';

const {
    NODE_ENV, PORT, DATABASE_URL, SESS_NAME, SESS_SECRET,
} = process.env;

// Connect to our database
(async () => {
    try {
        await mongoose
            .connect(DATABASE_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            });
        console.log('DB connection successful');
    } catch (err) {
        console.log(err);
    }

    // Initialize the server
    const app = express();

    app.use(passport.initialize());

    passport.use(
        new Strategy(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: process.env.JWT_SECRET,
            },
            ((jwtPayload, done) => {
                User.findOne({ userId: jwtPayload.id })
                    .then((user) => {
                        if (user) {
                            done(null, user);
                        } else {
                            done(null, false);
                        }
                    })
                    .catch((err) => done(err));
            }),
        ),
    );

    // // needed for rate limiting by Client IP
    // app.enable('trust proxy');

    // Perform basic logging of requests [could be disabled for perfect security after dev]
    app.use(morgan('common'));

    // Set security defaults
    app.use(helmet());

    // Allow CORS from the frontend
    app.use(cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    }));

    // Parse body of HTTP requests
    app.use(express.urlencoded({ extended: true }));

    // Parse JSON bodies
    app.use(express.json());

    const MongoStore = connectStore(session);
    const cookieAge = 1000 * 60 * 60;
    const cookie = { sameSite: true, maxAge: cookieAge };

    if (NODE_ENV === 'production') {
        app.set('trust proxy', 1); // trust first proxy
        cookie.secure = true; // serve secure cookies
    }

    app.use(session({
        name: SESS_NAME,
        secret: SESS_SECRET,
        saveUninitialized: false,
        resave: false,
        store: new MongoStore({
            mongooseConnection: mongoose.connection,
            collection: 'session',
            ttl: cookieAge / 1000,
        }),
        cookie,
    }));

    app.get('/', (req, res) => {
        res.json({
            message: 'Hello World!',
        });
    });

    // import and define our apis
    const apiRouter = express.Router();
    app.use('/api', apiRouter);
    apiRouter.use('/user', userRoutes);
    apiRouter.use('/email', emailRoutes);
    apiRouter.use('/survey', surveyRoutes);
    apiRouter.use('/session', sessionRoutes);

    app.use(middlewares.notFound);
    app.use(middlewares.errorHandler);

    // Connect to the database and start the server
    const port = PORT || 1337;

    app.listen(port, () => {
        console.log(`App listening at http://localhost:${port}`);
    });
})();
