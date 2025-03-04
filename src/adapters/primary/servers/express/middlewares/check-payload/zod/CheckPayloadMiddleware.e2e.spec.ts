import { Request, Response } from 'express';
import { z } from 'zod';
import { UnprocessableEntityException } from '@hexagon/exceptions/http/UnprocessableEntityException';
import { CheckPayloadMiddleware } from './CheckPayloadMiddleware';

describe('Validation des données avec Zod', () => {
  const res: Response = {} as Response;

  describe.each(['query', 'body'])('Validation des paramètres dans le "%s"', (keyParameter) => {
    const req: Request = {
      [keyParameter]: {
        name: 'Quentin',
      },
    } as unknown as Request;

    test('Doit valider les données', () => {
      const next = jest.fn();
      const userSchema = z.object({
        name: z.string().min(2),
      });
      userSchema.parse = jest.fn(userSchema.parse);

      const checkPayloadMiddleware = new CheckPayloadMiddleware({
        [keyParameter]: userSchema,
      });
      checkPayloadMiddleware.handler()(req, res, next);

      expect(userSchema.parse).toHaveBeenCalledWith(req[keyParameter as keyof typeof req]);
      expect(next).toHaveBeenCalledWith();
    });

    test('Doit générer une UnprocessableEntityException si les données sont invalides', () => {
      const next = jest.fn();
      const userSchema = z.object({
        name: z.string().min(10),
      });
      userSchema.parse = jest.fn(userSchema.parse);

      const checkPayloadMiddleware = new CheckPayloadMiddleware({
        [keyParameter]: userSchema,
      });
      const execute = () => checkPayloadMiddleware.handler()(req, res, next);
      expect(execute).toThrow(UnprocessableEntityException);
      expect(next).toHaveBeenCalledTimes(0);
    });

    test('Doit envoyer l\'erreur au middleware suivant si elle n\'est pas une erreur zod', () => {
      const error = new Error();
      const next = jest.fn(() => {
        throw error;
      });
      const userSchema = z.object({
        name: z.string().min(1),
      });
      userSchema.parse = jest.fn(userSchema.parse);

      const checkPayloadMiddleware = new CheckPayloadMiddleware({
        [keyParameter]: userSchema,
      });
      const execute = () => checkPayloadMiddleware.handler()(req, res, next);
      expect(execute).toThrow(Error);
      expect(next).toHaveBeenCalledTimes(2);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  test('Doit pouvoir recevoir un schema pour la query et le body', () => {
    const req: Request = {
      query: {
        name: 'Quentin',
      },
      body: {
        name: 'Quentin',
      },
    } as unknown as Request;
    const next = jest.fn();
    const userSchema1 = z.object({
      name: z.string().min(2),
    });
    userSchema1.parse = jest.fn(userSchema1.parse);
    const userSchema2 = z.object({
      name: z.string().min(2),
    });
    userSchema2.parse = jest.fn(userSchema2.parse);

    const checkPayloadMiddleware = new CheckPayloadMiddleware({
      query: userSchema1,
      body: userSchema2,
    });
    checkPayloadMiddleware.handler()(req, res, next);

    expect(userSchema1.parse).toHaveBeenCalledWith(req.query);
    expect(userSchema2.parse).toHaveBeenCalledWith(req.body);
    expect(next).toHaveBeenCalledWith();
  });
});
