/** @type {import('jest').Config} */
const config = {
  verbose: true,
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  testEnvironment: "node",
};

export default config;
