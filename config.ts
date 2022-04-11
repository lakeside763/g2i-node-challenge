const port = process.env.PORT;
const redisPort: number = parseInt(process.env.REDIS_PORT!);
const redisHost: string = process.env.REDIS_HOST!;

const redis = {
  port: redisPort,
  host: redisHost,
};

export default {
  port,
  redis,
};
