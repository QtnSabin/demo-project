import * as dotenv from 'dotenv';
import { SystemConfig } from '@secondary/models/SystemConfig';
import { ConfigProvider } from '@hexagon/gateways/ConfigProvider';

const KEYS = [
  'PORT',
  'OPEN_WEATHER_API_KEY',
] as const;

type Key = typeof KEYS[number];

export class DotEnvConfigProvider implements ConfigProvider {
  private _config: SystemConfig;
  private _path: string;

  public constructor(path: any) {
    this._path = path;
    this._config = this.load();
  }

  public get() {
    return this._config;
  }

  private load() {
    dotenv.config({ path: this._path, override: true });

    this.assertNotEmptyValues();

    const config: SystemConfig = {
      port: this.getNumber('PORT'),
      openWeather: {
        apiKey: this.getString('OPEN_WEATHER_API_KEY'),
      },
    };

    return config;
  }

  private assertNotEmptyValues() {
    KEYS.forEach((key) => {
      if (!this.getString(key)) throw this.getEmptyKeyError(key);
    });
  }

  private getString(key: Key) {
    return process.env[key] as string;
  }

  private getNumber(key: Key) {
    const value = Number(this.getString(key));
    if (Number.isNaN(value)) throw this.getInvalidKeyError(key);
    return value;
  }

  private getEmptyKeyError(key: Key) {
    return new Error(`Empty ${key} value in ${this._path}.`);
  }

  private getInvalidKeyError(key: Key) {
    return new Error(`Invalid ${key} value in ${this._path}.`);
  }
}
