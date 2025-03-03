import { WeatherByCity } from '@hexagon/models/weather/WeatherByCity';
import { WeatherByLatLong } from '@hexagon/models/weather/WeatherByLatLong';
import { WeatherRepository } from '@hexagon/repositories/WeatherRepository';
import { RestApiProvider } from '@infrastructures/rest-api/RestApiProvider';
import { WeatherException } from '@hexagon/exceptions/http/WeatherException';
import { LogProvider } from '@hexagon/gateways/LogProvider';
import { OpenWeatherResponse } from './OpenWeatherResponse';

export const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
export class OpenWeatherRepository implements WeatherRepository {
  public constructor(
    private readonly _restApiProvider: RestApiProvider,
    private readonly _logProvider: LogProvider,
    private readonly _apiKey: string,
    private readonly _options: { lang: 'fr', units: 'metric' },
  ) {}

  public async getByCity(city: string): Promise<WeatherByCity> {
    const params = {
      q: city,
      appId: this._apiKey,
      ...this._options,
    };
    const { body: result } = await this.callOpenWeather<OpenWeatherResponse>(BASE_URL, params);

    return {
      city: result.name,
      description: result.weather[0].description,
      humidity: result.main.humidity,
      temperature: result.main.temp,
    };
  }

  public async getByLatLong(latitude: number, longitude: number): Promise<WeatherByLatLong> {
    const params = {
      lat: latitude,
      lon: longitude,
      appId: this._apiKey,
      ...this._options,
    };
    const { body: result } = await this.callOpenWeather<OpenWeatherResponse>(BASE_URL, params);

    return {
      latitude: result.coord.lat,
      longitude: result.coord.lon,
      description: result.weather[0].description,
      humidity: result.main.humidity,
      temperature: result.main.temp,
    };
  }

  private async callOpenWeather<T>(url: string, params: Record<string, unknown>) {
    try {
      const result = await this._restApiProvider.get<T>(url, params);
      return result;
    } catch (error: any) {
      this._logProvider.error(error);
      if (error.response?.data?.cod && error.response?.data?.message) {
        throw new WeatherException(error.response?.data?.cod, error.response?.data?.message);
      }
      throw error;
    }
  }
}
