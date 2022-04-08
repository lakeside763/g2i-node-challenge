import compression from 'compression';
import express from 'express';
import fs from 'fs';
import helmet from 'helmet';
import winston from 'winston';
import cors from 'cors';
import https from 'https';
import config from './config';

const corsOptions = {
  origin: ['http://localhost:3000'],
  optionSuccessStatus: 200,
};

const httpsOptions = {
  key: fs.readFileSync('./certs/test-key.key'),
  cert: fs.readFileSync('./certs/test-cert.pem'),
};

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}

export const { port } = config;

const app = express();

export const server = https.createServer(httpsOptions, app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(helmet());
app.use(cors(corsOptions));
