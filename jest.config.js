// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
const path = require('path')

module.exports = {
  clearMocks: true,

  coverageDirectory: 'coverage',

  collectCoverageFrom: [
    "**/*.js",
    "!**/node_modules/**"
  ],

  notify: true,
  notifyMode: 'failure-change',

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },

  moduleFileExtensions: [
    'js',
    'json',
    'vue'
  ],

  rootDir: path.resolve(__dirname),

  testEnvironment: 'node',
  testTimeout: 10000,

  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+\\.(js|jsx)?$': 'babel-jest'
  },

  setupFiles: ['./test/setup.js']
};
