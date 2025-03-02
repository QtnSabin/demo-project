import { WeatherByCity } from '@hexagon/models/weather/WeatherByCity';
import { WeatherByLatLong } from '@hexagon/models/weather/WeatherByLatLong';
import { WeatherRepository } from '@hexagon/repositories/WeatherRepository';
import { RestApiProvider } from '@infrastructures/rest-api/RestApiProvider';
import { OpenWeatherResponse } from './OpenWeatherResponse';

export const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
export class OpenWeatherRepository implements WeatherRepository {
  public constructor(
    private readonly _restApiProvider: RestApiProvider,
    private readonly _apiKey: string,
    private readonly _options: { lang: 'fr', units: 'metric' },
  ) {}

  public async getByCity(city: string): Promise<WeatherByCity> {
    const { body: result } = await this._restApiProvider.get<OpenWeatherResponse>(BASE_URL, {
      q: city,
      appId: this._apiKey,
      ...this._options,
    });

    return {
      city: result.name,
      description: result.weather[0].description,
      humidity: result.main.humidity,
      temperature: result.main.temp,
    };
  }

  public async getByLatLong(latitude: number, longitude: number): Promise<WeatherByLatLong> {
    const { body: result } = await this._restApiProvider.get<OpenWeatherResponse>(BASE_URL, {
      lat: latitude,
      long: longitude,
      appId: this._apiKey,
      ...this._options,
    });

    return {
      latitude: result.coord.lat,
      longitude: result.coord.lon,
      description: result.weather[0].description,
      humidity: result.main.humidity,
      temperature: result.main.temp,
    };
  }
}
