import { UnprocessableEntityException } from '@hexagon/exceptions/http/UnprocessableEntityException';
import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodSchema } from 'zod';

export class CheckPayloadMiddleware {
  public constructor(
    private readonly _schemas: { query: ZodSchema },
  ) {}

  private handle(req: Request, res: Response, next: NextFunction): void {
    try {
      req.query = this._schemas.query.parse(req.query);
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
