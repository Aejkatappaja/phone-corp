/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testEnvironment: "node",
  preset: "ts-jest --config=jest.config.ts",
  transformIgnorePatterns: ["/node_modules/(?!(uuid)/)"],
};
