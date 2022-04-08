require('ts-node').register({ transpileOnly: true });
const { server, port, logger } = require('./server.ts');

server.listen(port, () => logger.info(`Server Running in ${process.env.NODE_ENV} on ${port}`));
