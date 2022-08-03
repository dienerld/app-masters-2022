import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { routes } from './routes';

const whitelist = (process.env.ALLOWED_ORIGINS?.split(/,\s{1,}/)) || ['*'];
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
