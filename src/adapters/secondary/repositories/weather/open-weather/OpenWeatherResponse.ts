export interface OpenWeatherResponse {
  /**
   * Coordonnées
   */
  coord: {
    /**
     * Latitude
     */
    lon: number
    /**
     * Longitude
     */
    lat: number
  }
  /**
   * Météos (premier élément correspondant à la météo principale)
   */
  weather: Array<{
    /**
     * Description
     */
    description: string
  }>
  /**
   * Informations principales
   */
  main: {
    /**
     * Température
     */
    temp: number
    /**
     * Humidité
     */
    humidity: number
  }
  /**
   * Ville
   */
  name: string
}
