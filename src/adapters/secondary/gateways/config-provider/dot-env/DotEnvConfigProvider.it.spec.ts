import { tmpdir } from 'os';
import { join } from 'path';
import { mkdirSync, rmSync, writeFileSync } from 'fs';
import { DotEnvConfigProvider } from './DotEnvConfigProvider';

const FAKE_PATH = join(tmpdir(), 'fake');

describe('Configuration avec DotEnv', () => {
  const dotEnvPath = join(FAKE_PATH, '.env.test');

  const validEnv = `
    PORT=3000
    OPEN_WEATHER_API_KEY=abc
  `;

  beforeEach(() => {
    rmSync(FAKE_PATH, { force: true, recursive: true });
    mkdirSync(FAKE_PATH);
  });

  test.each`
    field
    ${'PORT'}
    ${'OPEN_WEATHER_API_KEY'}
  `('La valeur "$field" doit être renseignée', ({ field }) => {
    const values = {
      PORT: 3000,
      OPEN_WEATHER_API_KEY: 'abc',
      [field]: '',
    };
    writeFileSync(dotEnvPath, `
      PORT=${values.PORT}
      OPEN_WEATHER_API_KEY=${values.OPEN_WEATHER_API_KEY}
    `);
    expect(() => new DotEnvConfigProvider(dotEnvPath).get()).toThrow(`Empty ${field} value in ${dotEnvPath}.`);
  });

  test('Récupération de la configuration', () => {
    writeFileSync(dotEnvPath, validEnv);
    const dotEnvProvider = new DotEnvConfigProvider(dotEnvPath);
    expect(dotEnvProvider.get()).toEqual({
      port: 3000,
      openWeather: {
        apiKey: 'abc',
      },
    });
  });
});
