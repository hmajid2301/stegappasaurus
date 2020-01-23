const {
  PERMISSIONS,
  RESULTS,
} = require('react-native-permissions/lib/commonjs/constants.js');

export {PERMISSIONS, RESULTS};

export async function check(permission) {
  jest.fn();
}

export async function request(permission) {
  jest.fn();
}
