module.exports = {
  moduleDirectories: [
    'node_modules',
    'src',
    'test',
  ],
  transform: {
    '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  setupFilesAfterEnv: [
    '<rootDir>/test/setup-unit-tests.ts',
  ],
  testMatch: [
    '<rootDir>/src/**/__tests__/*.test.{ts,tsx}',
  ],
};
