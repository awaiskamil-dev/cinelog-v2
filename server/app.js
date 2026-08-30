require('dotenv').config();
require('express-async-errors');
// express

const express = require('express');
const app = express();
// rest of the packages
const cookieParser = require('cookie-parser');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');

// database
const connectDB = require('./db/connect');

//  routers
const authRouter = require('./routes/authRoutes');
const entryRouter = require('./routes/entryRoutes');
const movieRouter = require('./routes/movieRoutes');
const tvRouter = require('./routes/tvRoutes');

// middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const authLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: 'Too many attempts, please try again later.',
});
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 300,
});

app.set('trust proxy', 1);

app.use(cors({
  origin: 'https://cinelog-tracker.netlify.app',
  credentials: true
}));

app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.get('/api/v1/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/v1/auth', authLimiter, authRouter);
app.use('/api/v1/entries', entryRouter);
app.use('/api/v1/movies', apiLimiter, movieRouter);
app.use('/api/v1/tv', apiLimiter, tvRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, '0.0.0.0', () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
