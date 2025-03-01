// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('./jest.config');

config.testRegex = '(?<!.it|e2e).spec.ts$';

module.exports = config;
