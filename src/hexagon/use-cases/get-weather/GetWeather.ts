import { WeatherRepository } from '@hexagon/repositories/WeatherRepository';

export type GetWeatherPayload = { city: string, lat?: number, lng?: number}
  | { city?: string, lat: number, lng: number }

export class GetWeather {
  public constructor(
    private readonly _weatherRepository: WeatherRepository,
  ) {}

  public async execute(data: GetWeatherPayload) {
    if (data.city) {
      return this._weatherRepository.getByCity(data.city);
    }
    return this._weatherRepository.getByLatLong(data.lat!, data.lng!);
  }
}
