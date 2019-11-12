module.exports = {
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/index.ts'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/src/$1',
  },
  modulePathIgnorePatterns: ['.history', 'data.ts'],
  preset: 'react-native',
  setupFiles: [
    '<rootDir>/__tests__/setupTests.ts',
    './node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.ts?(x)'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|react-clone-referenced-element|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|sentry-expo|native-base))',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/__tests__/setupTests.ts',
  ],
  timers: 'fake',
};
