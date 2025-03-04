import request from 'supertest';
import { GetSumObject } from '@hexagon/use-cases/get-sum-object/GetSumObject';
import { App } from '../../App';

describe('Récupération du cumul des nombres dans une structure JSON', () => {
  const app = new App();
  const url = '/json/sum';

  beforeAll(() => {
    app.initServer();
  });
  afterAll(() => {
    app.server.close();
  });

  test('Doit renvoyer le total', async () => {
    const paylaod = { a: 1 };
    GetSumObject.prototype.execute = jest.fn(GetSumObject.prototype.execute);

    const response = await request(app.app).post(url).send(paylaod);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(1);
    expect(GetSumObject.prototype.execute).toHaveBeenCalledWith(paylaod);
  });
});
