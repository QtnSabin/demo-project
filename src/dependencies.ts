import { RestApiProviderStub } from '@infrastructures/rest-api/RestApiProviderStub';
import { DotEnvConfigProvider } from '@secondary/gateways/config-provider/dot-env/DotEnvConfigProvider';
import { FnsDateManager } from '@secondary/gateways/date-manager/fns/FnsDateManager';
import { DateProviderStub } from '@secondary/gateways/date-provider/DateProviderStub';
import { SystemDateProvider } from '@secondary/gateways/date-provider/system/SystemDateProvider';
import { ConsoleLogProvider } from '@secondary/gateways/log-provider/console/ConsoleLogProvider';
import { LogProviderStub } from '@secondary/gateways/log-provider/LogProviderStub';

const isTest = process.env.NODE_ENV === 'test';
const config = new DotEnvConfigProvider(isTest ? '.env.test' : '.env').get();

const dateProvider = isTest ? new DateProviderStub() : new SystemDateProvider();
const dateManager = new FnsDateManager();
const logProvider = isTest ? new LogProviderStub() : new ConsoleLogProvider(dateProvider, dateManager);
const restApiProvider = isTest ? new RestApiProviderStub() : new RestApiProviderStub();

export const dependencies = {
  isTest,
  config,

  dateProvider,
  dateManager,
  logProvider,
  restApiProvider,
};
