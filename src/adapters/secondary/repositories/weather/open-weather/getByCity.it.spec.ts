import { dependencies } from '@dependencies';
import { RestApiProviderStub } from '@infrastructures/rest-api/RestApiProviderStub';
import { WeatherException } from '@hexagon/exceptions/http/WeatherException';
import { LogProviderStub } from '@secondary/gateways/log-provider/LogProviderStub';
import { BASE_URL, OpenWeatherRepository } from './OpenWeatherRepository';

describe('Récupération de la météo par ville', () => {
  const restApiProvider = dependencies.restApiProvider as RestApiProviderStub;
  const logProvider = dependencies.logProvider as LogProviderStub;
  let openWeatherRepository: OpenWeatherRepository;

  const API_KEY = 'api_key';
  const defaultOpenWeatherResponse = {
    coord: {
      lon: 42,
      lat: 56.4,
    },
    weather: [{
      description: 'Nuageux',
    }],
    main: {
      temp: 38,
      humidity: 61,
    },
    name: 'Paris',
  };

  beforeEach(() => {
    openWeatherRepository = new OpenWeatherRepository(restApiProvider, logProvider, API_KEY, { lang: 'fr', units: 'metric' });

    // Données par défaut
    restApiProvider.getData = {
      [BASE_URL]: {
        body: defaultOpenWeatherResponse,
        status: 200,
      },
    };
  });

  test('Doit envoyer les paramètres lors de la récupération de la météo', async () => {
    await openWeatherRepository.getByCity('Paris');
    expect(restApiProvider.getParams).toEqual([{
      url: BASE_URL,
      params: {
        q: 'Paris',
        appId: API_KEY,
        lang: 'fr',
        units: 'metric',
      },
    }]);
  });

  test('Doit récupérer la météo au bon format', async () => {
    const result = await openWeatherRepository.getByCity('Paris');
    expect(result).toEqual({
      city: defaultOpenWeatherResponse.name,
      temperature: defaultOpenWeatherResponse.main.temp,
      humidity: defaultOpenWeatherResponse.main.humidity,
      description: defaultOpenWeatherResponse.weather[0].description,
    });
  });

  test('Doit récupérer la description de la première météo s\'il y en a plusieurs', async () => {
    const manyWeatherResponse = {
      ...defaultOpenWeatherResponse,
      weather: [
        { description: 'Nuageux 1' },
        { description: 'Nuageux 2' },
      ],
    };
    restApiProvider.getData = {
      [BASE_URL]: {
        body: manyWeatherResponse,
        status: 200,
      },
    };

    const result = await openWeatherRepository.getByCity('Paris');
    expect(result.description).toEqual(manyWeatherResponse.weather[0].description);
  });

  test('Doit envoyer un log d\'erreur en cas d\'erreur', async () => {
    const error = new Error('erreur');
    restApiProvider.getAction = () => {
      throw error;
    };

    const execute = () => openWeatherRepository.getByCity('Paris');
    await expect(execute()).rejects.toThrow(Error);
    expect(logProvider.errorParams).toEqual([{ message: error }]);
  });

  test('Doit intercepter l\'erreur HTTP OpenWeather', async () => {
    const mockError = {
      response: {
        data: {
          cod: 401,
          message: 'Invalid API key',
        },
      },
    };

    restApiProvider.getAction = () => {
      throw mockError;
    };

    const execute = () => openWeatherRepository.getByCity('Paris');
    await expect(execute()).rejects.toThrow(WeatherException);
  });
});
