module.exports = {
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/index.ts'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/src/$1',
  },
  modulePathIgnorePatterns: ['.history', 'data.ts'],
  preset: '@testing-library/react-native',
  setupFiles: [
    './node_modules/@testing-library/react-native/jest-preset',
    './node_modules/react-native-gesture-handler/jestSetup.js',
    '<rootDir>/__tests__/setupTests.ts',
  ],
  setupFilesAfterEnv: [
    './node_modules/@testing-library/react-native/cleanup-after-each',
  ],
  snapshotSerializers: [
    './node_modules/@testing-library/react-native/dist/preset/serializer.js',
  ],
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  testMatch: ['**/__tests__/**/*.ts?(x)'],
  transformIgnorePatterns: [
    './node_modules/(?!(react-native.*|@?react-navigation.*)/)',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/__tests__/setupTests.ts',
  ],
};
