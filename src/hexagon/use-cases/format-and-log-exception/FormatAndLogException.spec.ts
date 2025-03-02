import { LogProviderStub } from '@secondary/gateways/log-provider/LogProviderStub';
import { NotFoundException } from '@hexagon/exceptions/http/NotFoundException';
import { ExecuteData, FormatAndLogException } from './FormatAndLogException';

describe('Gestion des exceptions', () => {
  let logProvider: LogProviderStub;
  let formatAndLogException: FormatAndLogException;

  const data: ExecuteData = {
    path: '/test',
    method: 'post',
  };

  beforeEach(() => {
    logProvider = new LogProviderStub();
    formatAndLogException = new FormatAndLogException(logProvider);
  });

  describe('Gestion des erreurs non gérées', () => {
    test('Doit logger les erreurs', () => {
      formatAndLogException.execute(data, new Error());

      const expectedDetails = {
        status: 500,
        content: {
          type: 'unknown_error',
          message: 'An error has occurred',
        },
      };
      expect(logProvider.errorParams).toEqual([{
        message: `[500] → ${data.method.toUpperCase()} ${data.path}\n${JSON.stringify(expectedDetails, undefined, 2)}`,
      }]);
    });

    test('Doit envoyer les informations', async () => {
      const result = formatAndLogException.execute(data, new Error());

      const expectedDetails = {
        status: 500,
        content: {
          type: 'unknown_error',
          message: 'An error has occurred',
        },
      };
      expect(result).toEqual({
        className: 'Error',
        response: expectedDetails,
      });
    });
  });

  describe('Gestion des erreurs Http', () => {
    test('Doit logger les erreurs', () => {
      formatAndLogException.execute(data, new NotFoundException());

      const expectedDetails = {
        status: 404,
        content: {
          type: 'not_found',
          message: 'Resource not found',
        },
      };
      expect(logProvider.errorParams).toEqual([{
        message: `[404] → ${data.method.toUpperCase()} ${data.path}\n${JSON.stringify(expectedDetails, undefined, 2)}`,
      }]);
    });

    test('Doit envoyer les informations', async () => {
      const result = formatAndLogException.execute(data, new NotFoundException());

      const expectedDetails = {
        status: 404,
        content: {
          type: 'not_found',
          message: 'Resource not found',
        },
      };
      expect(result).toEqual({
        className: 'NotFoundException',
        response: expectedDetails,
      });
    });
  });
});
