module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": ["babel-jest", { configFile: "./babel.config.cjs" }],
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@/config/firebase$": "<rootDir>/src/tests/firebase-mock.ts",
  },
  setupFilesAfterEnv: ["<rootDir>/src/SetupTests.ts"],
};
