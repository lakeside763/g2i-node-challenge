const port = process.env.PORT;
const redisPort: number = parseInt(process.env.REDIS_PORT!);
const redisHost: string = process.env.REDIS_HOST!;

const redis = {
  port: redisPort,
  host: redisHost,
};

const jwt = {
  secret: process.env.JWT_SECRET,
  audience: process.env.JWT_AUD,
  issuer: process.env.JWT_ISS,
  expiresIn: process.env.JWT_EXP,
};

export default {
  port,
  redis,
  jwt,
};
