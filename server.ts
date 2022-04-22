import compression from 'compression';
import express, { NextFunction, Request, Response } from 'express';
import Redis from 'ioredis';
import fs from 'fs';
import helmet from 'helmet';
import winston from 'winston';
import cors from 'cors';
import https, { Server } from 'https';
import config from './config';
import { AcronymService, AuthService, TokenService } from './services';
import prisma from './database_connection';
import acronymRoutes from './routes/acronym.routes';
import authRoutes from './routes/auth.routes';
import { errorHandler } from './middlewares/error-handler';

export const { port } = config;

const cache = new Redis(config.redis);

const corsOptions = { origin: ['http://localhost:3000'], optionSuccessStatus: 200 };

const httpsOptions = { key: fs.readFileSync('./certs/test-key.key'), cert: fs.readFileSync('./certs/test-cert.pem') };

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [new winston.transports.File({ filename: 'error.log', level: 'error' })],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({ format: winston.format.simple() }));
}

export const app = express();

export const server = https.createServer(httpsOptions, app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(helmet());
app.use(cors(corsOptions));

// Services
export const services = {
  acronym: new AcronymService(prisma),
  token: new TokenService(config.jwt, cache),
  auth: new AuthService(prisma),
};

// Routes
acronymRoutes(app, services);
authRoutes(app, services);
app.use(errorHandler);
// eslint-disable-next-line no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.end({ message: 'Error' });
});

// eslint-disable-next-line no-shadow
export const shutdown = async (server: Server) => {
  logger.info('Received kill signal, shutting down gracefully'); // eslint-disable-line no-console
  await prisma.$disconnect();
  server.close();
  return process.exit();
};
