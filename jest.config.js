module.exports = {
  clearMocks: true,
  setupFiles: ['<rootDir>/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': '<rootDir>/__mocks__/mocks.js',
  }
};