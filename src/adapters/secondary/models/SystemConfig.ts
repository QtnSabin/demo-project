import { Config } from '@hexagon/models/Config';

export interface SystemConfig extends Config {
  /**
   * Port d'écoute de l'API.
   */
  port: number
  /**
   * Données relatives à OpenWeather
   */
  openWeather: {
    /**
     * Clé d'API
     */
    apiKey: string
  }
}
