const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, '../../'),
  testURL: 'http://localhost:3000/',
  moduleFileExtensions: [
    'js',
    'json',
    'vue'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
  },
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
  setupFiles: ['<rootDir>/test/unit/setup.js'],
  coverageDirectory: '<rootDir>/test/unit/coverage',
  // collectCoverageFrom: [
  //   'src/**/*.{js,vue}',
  //   '!src/main.js',
  //   '!**/node_modules/**'
  // ]
}
