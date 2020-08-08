const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

// Allow pulling in environment variables across the application
require('dotenv').config();

// Import our routes and middlewares
const middlewares = require('./middlewares');
const logs = require('./api/logs');

// Initialize the server
const app = express();

// // needed for rate limiting by Client IP
// app.enable('trust proxy');

// Connect to our database
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Perform basic logging of requests [could be disabled for perfect security after dev]
app.use(morgan('common'));

// Set security defaults
app.use(helmet());

// Allow CORS from the frontend
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));

// Parse JSON bodies
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World!',
    });
});

app.use('/api/logs', logs);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

// Start the server
const port = process.env.PORT || 1337;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
