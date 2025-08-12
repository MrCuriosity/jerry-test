/** @type {import('jest').Config} */
const config = {
  verbose: true,
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  testEnvironment: "node",
  preset: "ts-jest",
};

export default config;
