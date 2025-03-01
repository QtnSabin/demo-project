import { tmpdir } from 'os';
import { DotEnvConfigProvider } from './DotEnvConfigProvider';
import { join } from 'path';
import { mkdirSync, rmSync, writeFileSync } from 'fs';

const FAKE_PATH = join(tmpdir(), 'fake');

describe('Configuration avec DotEnv', () => {
  const dotEnvPath = join(FAKE_PATH, '.env.test');

  const validEnv = `
    PORT=3000
  `;

  beforeEach(() => {
    rmSync(FAKE_PATH, { force: true, recursive: true });
    mkdirSync(FAKE_PATH);
  });

  test.each`
    field
    ${'PORT'}
  `('La valeur "$field" doit être renseignée', ({ field }) => {
    const values = {
      PORT: 3000,
      [field]: '',
    };
    writeFileSync(dotEnvPath, `
      PORT=${values.PORT}
    `);
    expect(() => new DotEnvConfigProvider(dotEnvPath).get()).toThrow(`Empty ${field} value in ${dotEnvPath}.`);
  });


  test('Récupération de la configuration', () => {
    writeFileSync(dotEnvPath, validEnv);
    const dotEnvProvider = new DotEnvConfigProvider(dotEnvPath);
    expect(dotEnvProvider.get()).toEqual({
      port: 3000,
    });
  });
});
