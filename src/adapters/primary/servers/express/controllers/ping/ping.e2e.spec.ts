import request from 'supertest';
import { App } from '../../App';

describe('Envoie d\'un ping', () => {
  const app = new App();

  beforeAll(() => {
    app.initServer();
  });
  afterAll(() => {
    app.server.close();
  });

  test('Doit renvoyer true', async () => {
    const response = await request(app.app).get('/api/ping');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(true);
  });
});
