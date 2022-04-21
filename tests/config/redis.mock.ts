// eslint-disable-next-line import/no-unresolved
import ioredisMock from 'ioredis-mock';

jest.mock('ioredis', () => ioredisMock);
