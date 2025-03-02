import { Request, Response } from 'express';
import { z } from 'zod';
import { UnprocessableEntityException } from '@hexagon/exceptions/http/UnprocessableEntityException';
import { CheckPayloadMiddleware } from './CheckPayloadMiddleware';

describe('Validation des données avec Zod', () => {
  const req: Request = {
    query: {
      name: 'Quentin',
    },
  } as unknown as Request;
  const res: Response = {} as Response;

  test('Doit valider les données dans les paramètres de la requête', () => {
    const next = jest.fn();
    const userSchema = z.object({
      name: z.string().min(2),
    });
    userSchema.parse = jest.fn(userSchema.parse);

    const checkPayloadMiddleware = new CheckPayloadMiddleware({
      query: userSchema,
    });
    checkPayloadMiddleware.handler()(req, res, next);

    expect(userSchema.parse).toHaveBeenCalledWith(req.query);
    expect(next).toHaveBeenCalledWith();
  });

  test('Doit générer une UnprocessableEntityException si les paramètres de la requête sont invalide', () => {
    const next = jest.fn();
    const userSchema = z.object({
      name: z.string().min(10),
    });
    userSchema.parse = jest.fn(userSchema.parse);

    const checkPayloadMiddleware = new CheckPayloadMiddleware({
      query: userSchema,
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
      query: userSchema,
    });
    const execute = () => checkPayloadMiddleware.handler()(req, res, next);
    expect(execute).toThrow(Error);
    expect(next).toHaveBeenCalledTimes(2);
    expect(next).toHaveBeenCalledWith(error);
  });
});
