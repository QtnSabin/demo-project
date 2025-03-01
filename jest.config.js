const config = {
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: [
    'js',
    'ts',
  ],
  roots: ['<rootDir>/src'],
  testRegex: '\\.spec\\.ts$',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@primary/(.*)$': '<rootDir>/src/adapters/primary/$1',
    '^@secondary/(.*)$': '<rootDir>/src/adapters/secondary/$1',
    '^@hexagon/(.*)$': '<rootDir>/src/hexagon/$1',
    '^@infrastructures/(.*)$': '<rootDir>/src/infrastructures/$1',
    '^@test/(.*)$': '<rootDir>/src/test/$1',
    '^@dependencies$': '<rootDir>/src/dependencies',
  },
};

module.exports = config;
  