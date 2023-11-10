// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  testEnvironment: "node",
  restoreMocks: true,
  collectCoverageFrom: ["**/*.js"],
  coverageDirectory: "../coverage",
  moduleFileExtensions: ["js", "json", "node"],
};
