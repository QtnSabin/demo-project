import { Request, Response } from 'express';
import { z } from 'zod';
import { GetSumObject } from '@hexagon/use-cases/get-sum-object/GetSumObject';
import { jsonValidation } from '@primary/validations/zod/jsonValidation';
import { Controller } from '../Controller';

export class JsonController implements Controller {
  public basePath = '/json';

  public sum(req: Request<unknown, unknown, z.infer<typeof jsonValidation.sum>, unknown>, res: Response) {
    const getWeather = new GetSumObject();

    const result = getWeather.execute(req.body);
    res.json(result);
  }
}
