import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import dotenv from 'dotenv';
import router from './routes/userRoutes';
import { PORT } from './constants';
import { createGoogleAuthRoutes } from "./routes/socialAuthRoutes"; 
import './middleware/passport';
import './controllers/oAuth/google-strategy';
import prisma from './prisma/prismaClient';

dotenv.config();

const app = express();

const allowedOrigins = ['http://localhost:3000'];
app.use(
  cors({
    origin: function (origin, callback) {
      if (origin && allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else if (!origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

prisma.$connect()
  .then(() => {
    console.log('Connected to PostgreSQL via Prisma');
  })
  .catch((error: Error) => {
    console.error('Error connecting to database:', error);
  });

app.use('/api', router);

  // Authentication Routes (Google)
  app.use(createGoogleAuthRoutes());

const port = PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
