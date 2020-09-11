// Allow pulling in environment variables across the application
import 'dotenv/config';

import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import mongoose from 'mongoose';

// Import our routes and middlewares
import { userRoutes, emailRoutes, surveyRoutes } from './routes';
import middlewares from './middlewares';

// Initialize the server
const app = express();

// // needed for rate limiting by Client IP
// app.enable('trust proxy');

// Connect to our database
mongoose
    .connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(console.log('DB connection successful'))
    .catch((error) => console.log(error));

// Perform basic logging of requests [could be disabled for perfect security after dev]
app.use(morgan('common'));

// Set security defaults
app.use(helmet());

// Allow CORS from the frontend
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));

// Parse body of HTTP requests
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World!',
    });
});

// import and define our apis
const apiRouter = express.Router();
app.use('/api', apiRouter);
apiRouter.use('/users', userRoutes);
apiRouter.use('/emails', emailRoutes);
apiRouter.use('/surveys', surveyRoutes);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

// Connect to the database and start the server
const port = process.env.PORT || 1337;

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
