import request from 'supertest';
import { dependencies } from '@dependencies';
import { WeatherRepositoryStub } from '@secondary/repositories/weather/WeatherRepositoryStub';
import { GetWeather } from '@hexagon/use-cases/get-weather/GetWeather';
import { App } from '../../App';

describe('Récupération de la météo', () => {
  const weatherRepository = dependencies.weatherRepository as WeatherRepositoryStub;
  const app = new App();
  const url = '/weather';

  beforeAll(() => {
    app.initServer();
  });
  afterAll(() => {
    app.server.close();
  });

  describe('Validation des paramètres', () => {
    test('Doit générer une erreur si aucun paramètre n\'est envoyé', async () => {
      const response = await request(app.app).get(url);
      expect(response.status).toEqual(422);
      expect(response.body).toEqual(
        expect.objectContaining({
          details: {
            issues: [{
              code: 'custom',
              message: 'At least one field must be provided',
              path: ['city', 'lng', 'lat'],
            }],
            name: 'ZodError',
          },
        }),
      );
    });

    test('Doit générer une erreur si "city" est renseigné en même temps que "lng"', async () => {
      const response = await request(app.app).get(`${url}?city=Paris&lng=5`);
      expect(response.status).toEqual(422);
      expect(response.body).toEqual(
        expect.objectContaining({
          details: {
            issues: [{
              code: 'custom',
              message: 'city must not be present along with lat and lng',
              path: ['city'],
            }],
            name: 'ZodError',
          },
        }),
      );
    });

    test('Doit générer une erreur si "city" est renseigné en même temps que "lat"', async () => {
      const response = await request(app.app).get(`${url}?city=Paris&lat=5`);
      expect(response.status).toEqual(422);
      expect(response.body).toEqual(
        expect.objectContaining({
          details: {
            issues: [{
              code: 'custom',
              message: 'city must not be present along with lat and lng',
              path: ['city'],
            }],
            name: 'ZodError',
          },
        }),
      );
    });

    test('Doit générer une erreur si "lat" n\'est pas renseigné en même temps que "lng"', async () => {
      const response = await request(app.app).get(`${url}?lat=5`);
      expect(response.status).toEqual(422);
      expect(response.body).toEqual(
        expect.objectContaining({
          details: {
            issues: [{
              code: 'custom',
              message: 'lng must be present with lat',
              path: ['lng'],
            }],
            name: 'ZodError',
          },
        }),
      );
    });

    test('Doit générer une erreur si "lng" n\'est pas renseigné en même temps que "lat"', async () => {
      const response = await request(app.app).get(`${url}?lng=5`);
      expect(response.status).toEqual(422);
      expect(response.body).toEqual(
        expect.objectContaining({
          details: {
            issues: [{
              code: 'custom',
              message: 'lat must be present with lng',
              path: ['lat'],
            }],
            name: 'ZodError',
          },
        }),
      );
    });
  });

  describe('Récupération de la météo', () => {
    test('Doit récupérer la météo par latitude et longitude', async () => {
      const defaultWeather = {
        description: 'Nuageux',
        humidity: 18.3,
        latitude: 5,
        longitude: 10,
        temperature: 18,
      };
      const { latitude, longitude } = defaultWeather;
      weatherRepository.getByLatLongData = {
        [`${latitude}-${longitude}`]: defaultWeather,
      };

      GetWeather.prototype.execute = jest.fn(GetWeather.prototype.execute);
      const response = await request(app.app).get(`${url}?lat=${latitude}&lng=${longitude}`);
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(defaultWeather);
      expect(GetWeather.prototype.execute).toHaveBeenCalledWith({ lat: latitude, lng: longitude });
    });

    test('Doit récupérer la météo par ville', async () => {
      const defaultWeather = {
        description: 'Nuageux',
        humidity: 18.3,
        city: 'Paris',
        temperature: 18,
      };
      const { city } = defaultWeather;
      weatherRepository.getByCityData = {
        [city]: defaultWeather,
      };

      GetWeather.prototype.execute = jest.fn(GetWeather.prototype.execute);
      const response = await request(app.app).get(`${url}?city=${city}`);
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(defaultWeather);
      expect(GetWeather.prototype.execute).toHaveBeenCalledWith({ city });
    });
  });

  test('Doit verifier la présence du try/catch avec next(error)', async () => {
    GetWeather.prototype.execute = () => { throw new Error(); };
    const response = await request(app.app).get(`${url}?city=Paris`);
    expect(response.status).toEqual(500);
  });
});
