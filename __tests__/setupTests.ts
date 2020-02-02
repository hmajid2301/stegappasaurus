// @ts-ignore
import MockAsyncStorage from 'mock-async-storage';

(global as any).fetch = require('jest-fetch-mock');

jest.mock(
  '@react-native-community/async-storage',
  () => new MockAsyncStorage(),
);

jest.mock('@react-native-firebase/analytics', () => {
  return () => ({
    logEvent: jest.fn(),
    setUserProperties: jest.fn(),
    setUserId: jest.fn(),
    setCurrentScreen: jest.fn(),
  });
});
