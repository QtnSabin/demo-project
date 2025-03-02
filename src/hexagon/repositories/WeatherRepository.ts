import { WeatherByCity } from '@hexagon/models/weather/WeatherByCity';
import { WeatherByLatLong } from '@hexagon/models/weather/WeatherByLatLong';

export interface WeatherRepository {
  /**
   * Récupère la météo à partir du nom de la ville
   * @param city Nom de la ville
   */
  getByCity(city: string): Promise<WeatherByCity>
  /**
   * Récupère la météo à partir de coordonnés
   * @param latitude Latitude
   * @param longitude Longitude
   */
  getByLatLong(latitude: number, longitude: number): Promise<WeatherByLatLong>
}
