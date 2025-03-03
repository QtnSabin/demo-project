import { HttpException } from './HttpException';

export class WeatherException extends HttpException {
  public constructor(status: number, message: string) {
    super(status, 'weather_error', message);
  }
}
