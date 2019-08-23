module.exports = {
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/index.ts"],
  moduleFileExtensions: ["js", "jsx", "json", "ts", "tsx"],
  moduleNameMapper: {
    "~/(.*)": "<rootDir>/src/$1"
  },
  modulePathIgnorePatterns: [".history", "data.ts"],
  preset: "jest-expo",
  setupFiles: ["<rootDir>/__tests__/setupTests.ts"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  transform: {
    "^.+\\.tsx?$": "babel-jest"
  },
  testEnvironment: "jsdom",
  testMatch: ["**/__tests__/**/*.ts?(x)"],
  testPathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/__tests__/setupTests.ts"
  ],
  timers: "fake"
};
