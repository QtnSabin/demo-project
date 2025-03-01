import { Config } from '../models/Config';

export interface ConfigProvider {
  /**
   * Envoie la configuration.
   */
  get(): Config
}
