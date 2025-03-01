import { DateProviderStub } from '@secondary/gateways/date-provider/DateProviderStub';
import { DateManagerStub } from '@secondary/gateways/date-manager/DateManagerStub';
import { ConsoleLogProvider } from './ConsoleLogProvider';

describe('Ajout des logs dans la console', () => {
  const dateProvider = new DateProviderStub();
  const dateManager = new DateManagerStub();
  const logProvider = new ConsoleLogProvider(dateProvider, dateManager);

  describe('Ajout des logs d\'information', () => {
    beforeEach(() => {
      console.info = jest.fn();
    });

    test('Doit ajouter un log d\'information 1', () => {
      dateProvider.dateNow = new Date('2025-03-01 16:17:18');
      logProvider.info('message 1');
      expect(console.info).toHaveBeenCalledWith(`[formatAsDateTime-${new Date('2025-03-01 16:17:18').toISOString()}] message 1`);
    });

    test('Doit ajouter un log d\'information 2', () => {
      dateProvider.dateNow = new Date('2025-03-01 08:10:20');
      logProvider.info('message 2');
      expect(console.info).toHaveBeenCalledWith(`[formatAsDateTime-${new Date('2025-03-01 08:10:20').toISOString()}] message 2`);
    });
  });

  describe('Ajout des logs d\'erreur', () => {
    beforeEach(() => {
      console.error = jest.fn();
    });

    test('Doit ajouter un log d\'erreur 1', () => {
      dateProvider.dateNow = new Date('2025-03-01 16:17:18');
      logProvider.error('message 1');
      expect(console.error).toHaveBeenCalledWith(`[formatAsDateTime-${new Date('2025-03-01 16:17:18').toISOString()}] message 1`);
    });

    test('Doit ajouter un log d\'erreur 2', () => {
      dateProvider.dateNow = new Date('2025-03-01 08:10:20');
      logProvider.error('message 2');
      expect(console.error).toHaveBeenCalledWith(`[formatAsDateTime-${new Date('2025-03-01 08:10:20').toISOString()}] message 2`);
    });
  });
});
