export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/'],
  coverageReporters: ['lcov', 'html'],
  setupFiles: ['./tests/config/redis.mock.ts'],
  globalSetup: './tests/config/setup.config.ts',
  globalTeardown: './tests/config/teardown.config.ts',
  testTimeout: 30000,
};
