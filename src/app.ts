import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { env } from './config/env.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import indexRouter from './routes/index.js';

const app = express();

// Basic security & parsing
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN === '*' ? true : env.CORS_ORIGIN.split(',') }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging (dev only)
if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/', indexRouter);

// 404 and error handling
app.use(notFound);
app.use(errorHandler);

export default app;
