import { UnprocessableEntityException } from '@hexagon/exceptions/http/UnprocessableEntityException';
import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodSchema } from 'zod';

export class CheckPayloadMiddleware {
  public constructor(
    private readonly _schemas: {
      body?: ZodSchema
      query?: ZodSchema
    },
  ) {}

  private handle(req: Request, res: Response, next: NextFunction): void {
    try {
      if (this._schemas.query) req.query = this._schemas.query.parse(req.query);
      if (this._schemas.body) req.body = this._schemas.body.parse(req.body);
      next();
    } catch (err: unknown) {
      if (err instanceof ZodError) throw new UnprocessableEntityException<ZodError>(err);
      else next(err);
    }
  }

  public handler() {
    return this.handle.bind(this);
  }
}
