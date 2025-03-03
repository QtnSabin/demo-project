import { NextFunction, Request, Response } from 'express';
import { GetWeather, GetWeatherPayload } from '@hexagon/use-cases/get-weather/GetWeather';
import { dependencies } from '@dependencies';
import { z } from 'zod';
import { weatherValidation } from '@primary/validations/zod/weatherValidation';
import { Controller } from '../Controller';

export class WeatherController implements Controller {
  public basePath = '/weather';

  public async get(req: Request<unknown, unknown, unknown, z.infer<typeof weatherValidation.get>>, res: Response, next: NextFunction) {
    try {
      const { weatherRepository } = dependencies;
      const getWeather = new GetWeather(weatherRepository);

      const result = await getWeather.execute(req.query as GetWeatherPayload);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
