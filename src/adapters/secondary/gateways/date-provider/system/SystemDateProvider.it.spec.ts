import { SystemDateProvider } from './SystemDateProvider';

describe('Gestion des dates', () => {
  const dateProvider = new SystemDateProvider();

  test('Doit récupérer la date actuelle', () => {
    const result = dateProvider.now();
    const now = new Date();
    expect(result.getTime()).toBeGreaterThanOrEqual(now.getTime() - 100);
    expect(result.getTime()).toBeLessThanOrEqual(now.getTime() + 100);
  });
});
