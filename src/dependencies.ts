import { DotEnvConfigProvider } from '@secondary/gateways/config-provider/dot-env/DotEnvConfigProvider';

const isTest = process.env.NODE_ENV === 'test';
const isProduction = process.env.NODE_ENV === 'production';

const config = new DotEnvConfigProvider(isTest ? '.env.test' : '.env').get();

export const dependencies = {
  isTest,
  isProduction,
  config,
};
