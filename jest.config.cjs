/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  // Look for tests in __tests__ by default
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
  collectCoverage: true,
  collectCoverageFrom: ['index.js'],
  coverageReporters: ['text', 'lcov'],
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 80,
      functions: 100,
      lines: 90,
    },
  },
};
