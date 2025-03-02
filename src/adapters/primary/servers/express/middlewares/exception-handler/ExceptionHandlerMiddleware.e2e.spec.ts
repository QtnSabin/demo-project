import { Request, Response } from 'express';
import { FormatAndLogException } from '@hexagon/use-cases/format-and-log-exception/FormatAndLogException';
import { ExceptionHandlerMiddleware } from './ExceptionHandlerMiddleware';

describe('Interception des exceptions', () => {
  test('Doit renvoyer une réponse json', async () => {
    const req: Request = {
      body: {},
      params: {},
      query: {},
      headers: {},
      method: 'GET',
      originalUrl: '/test',
    } as Request;
    const res: Response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    } as unknown as Response;
    const next = jest.fn();
    const error = new Error();

    FormatAndLogException.prototype.execute = jest.fn(FormatAndLogException.prototype.execute);
    const exceptionHandlerMiddleware = new ExceptionHandlerMiddleware();
    exceptionHandlerMiddleware.handle(error, req, res, next);

    expect(res.json).toHaveBeenCalledWith({ message: 'An error has occurred', type: 'unknown_error' });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(FormatAndLogException.prototype.execute).toHaveBeenCalledWith({
      method: req.method,
      path: req.originalUrl,
    }, error);
    expect(next).toHaveBeenCalledWith(error);
  });
});
