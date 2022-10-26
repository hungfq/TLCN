module.exports = {
  verbose: true,
  testEnvironment: 'node',
  // setupFilesAfterEnv: ['./tests/utils/setup.js'],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.js',
    '!**/node_modules/**',
    '!**/scripts/**',
    '!**/migrations/**',
    '!**/templates/**',
    '!**/tests/**',
    '!./config.js',
    '!./jest.config.js',
    '!./migration_storage.js',
  ],
  coverageDirectory: './.coverage',
};
