module.exports = {
  ...require('@adhamu/zero/jest'),
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/example/**/*.{ts,tsx}',
    '!src/index.ts',
  ],
  snapshotSerializers: ['@emotion/jest/serializer'],
}
