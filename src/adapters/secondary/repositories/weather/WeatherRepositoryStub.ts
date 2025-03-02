import { WeatherByCity } from '@hexagon/models/weather/WeatherByCity';
import { WeatherByLatLong } from '@hexagon/models/weather/WeatherByLatLong';
import { WeatherRepository } from '@hexagon/repositories/WeatherRepository';
import { promisifyResult } from '@test/promiseStubResult';

export class WeatherRepositoryStub implements WeatherRepository {
  private _getByCityParams: Array<Record<string, unknown>> = [];
  private _getByCityData!: Record<string, WeatherByCity>;
  private _getByLatLongParams: Array<Record<string, unknown>> = [];
  private _getByLatLongData!: Record<string, WeatherByLatLong>;

  public async getByCity(city: string): Promise<WeatherByCity> {
    this._getByCityParams.push({ city });
    return promisifyResult(() => this._getByCityData[city]);
  }

  public async getByLatLong(lat: number, long: number): Promise<WeatherByLatLong> {
    this._getByLatLongParams.push({ lat, long });
    return promisifyResult(() => this._getByLatLongData[`${lat}-${long}`]);
  }
}
