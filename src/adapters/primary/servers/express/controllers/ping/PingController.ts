import { Request, Response } from 'express';
import { Controller } from '../Controller';

export class PingController implements Controller {
  public basePath = '/ping';

  public ping(req: Request, res: Response) {
    res.send(true);
  }
}
