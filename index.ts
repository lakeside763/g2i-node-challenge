import { server, port, logger, shutdown } from './server';

server.listen(port, () => logger.info(`Server Running in ${process.env.NODE_ENV} on ${port}`));

process.on('SIGINT', async () => {
  await shutdown(server);
});

process.on('SIGTERM', async () => {
  await shutdown(server);
});
