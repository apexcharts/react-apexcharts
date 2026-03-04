// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: [
    "/node_modules/",
    "/example/"
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // apexcharts/core is available from apexcharts >=5.10.0
    // Map to a local mock so tests work before that version is installed
    '^apexcharts/core$': '<rootDir>/__mocks__/apexcharts-core.js',
  },
};
