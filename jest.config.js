/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  clearMocks: true,
  coverageProvider: 'v8',
  moduleFileExtensions: ["js","jsx","ts","tsx","json","node"],
  
  preset: 'ts-jest',
  testEnvironment: 'node',
};