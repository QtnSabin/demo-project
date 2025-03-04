import { dependencies } from '@dependencies';
import { FormatAndLogException } from '@hexagon/use-cases/format-and-log-exception/FormatAndLogException';
import { NextFunction, Request, Response } from 'express';

export class ExceptionHandlerMiddleware {
  public handle(err: any, req: Request, res: Response, next: NextFunction): void {
    const formatAndLogException = new FormatAndLogException(dependencies.logProvider);

    const result = formatAndLogException.execute({
      method: req.method,
      path: req.originalUrl,
    }, err);

    res.status(result.response.status);
    res.json(result.response.content);
    next(err);
  }

  public handler() {
    return this.handle.bind(this);
  }
}
