// require('ts-node').register({});
import { server, port, logger } from './server';

server.listen(port, () => logger.info(`Server Running in ${process.env.NODE_ENV} on ${port}`));
