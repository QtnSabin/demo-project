import { ConfigProvider } from '@hexagon/gateways/ConfigProvider';
import { Config } from '@hexagon/models/Config';

export class ConfigProviderStub implements ConfigProvider {
  private _config: Partial<Config> | null = null;

  public get() {
    return this._config as Config;
  }

  public set config(config: Partial<Config>) {
    this._config = config;
  }
}
