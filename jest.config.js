/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  setupFilesAfterEnv: ['dotenv/config'],
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
};