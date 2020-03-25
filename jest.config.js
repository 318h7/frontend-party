module.exports = {
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  setupFilesAfterEnv: [
    '<rootDir>/tests/setup-unit-tests.ts',
  ],
  testMatch: [
    '<rootDir>/src/**/__tests__/*.test.{ts,tsx}',
  ],
};
