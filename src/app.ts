import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { env } from './config/env.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import indexRouter from './routes/index.js';
import publicRouter from './routes/public.js';
import usersRouter from './routes/users.js';
import healthRouter from './routes/health.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN === '*' ? true : env.CORS_ORIGIN.split(',') }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
};

app.use('/', indexRouter);
app.use('/public', publicRouter);
app.use('/users', usersRouter);
app.use('/health', healthRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
