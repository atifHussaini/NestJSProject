module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  jest: {
    moduleNameMapper: {
      '^src/(.*)$': '<rootDir>/$1',
    },
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/main.ts',
    '!src/**/*.(module|dto|entity).ts',
  ],
  coverageDirectory: 'coverage',
  testTimeout: 30000,
};
