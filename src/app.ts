import 'dotenv/config';
import 'reflect-metadata';
import './database';

import cors from 'cors';
import express from 'express';
import 'express-async-errors';

import { routes } from './routes';
import { RequestCustomError } from './errors/requestError';

const whitelist = (process.env.ALLOWED_ORIGINS?.split(/,\s{1,}/)) || [];
const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf('*') !== -1) {
      callback(null, true);
    } else if (origin && whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

export const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(routes);

app.use((err, req, res, next) => {
  if (err instanceof RequestCustomError) {
    return res.status(err.statusCode).json({
      error: err.error,
      statusCode: err.statusCode,
      errorMessage: err.errorMessage,
      requiredFields: err.requiredFields,
    });
  }
  return res.status(500).json({
    error: true,
    errorMessage: err.message,
  });
});
