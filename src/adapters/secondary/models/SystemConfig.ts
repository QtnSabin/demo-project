import { Config } from '@hexagon/models/Config';

export interface SystemConfig extends Config {
  /**
   * Port d'écoute de l'API.
   */
  port: number
}
