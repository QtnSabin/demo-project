import { FnsDateManager } from './FnsDateManager';

describe('Gestion des dates', () => {
  const dateManager = new FnsDateManager();
  const date = new Date('2025-03-01T21:50:42');

  describe('Formatages', () => {
    test('Doit formater en date heure', () => {
      expect(dateManager.formatAsDateTime(date)).toEqual('2025/03/01-21:50:42');
    });
  });
});
