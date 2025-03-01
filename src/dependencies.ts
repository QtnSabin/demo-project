import { DotEnvConfigProvider } from '@secondary/gateways/config-provider/dot-env/DotEnvConfigProvider';
import { DateProviderStub } from '@secondary/gateways/date-provider/DateProviderStub';
import { SystemDateProvider } from '@secondary/gateways/date-provider/system/SystemDateProvider';

const isTest = process.env.NODE_ENV === 'test';
const config = new DotEnvConfigProvider(isTest ? '.env.test' : '.env').get();

const dateProvider = isTest ? new DateProviderStub() : new SystemDateProvider();

export const dependencies = {
  isTest,
  config,

  dateProvider,
};
