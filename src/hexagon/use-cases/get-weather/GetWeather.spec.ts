import { WeatherRepositoryStub } from '@secondary/repositories/weather/WeatherRepositoryStub';
import { WeatherByCity } from '@hexagon/models/weather/WeatherByCity';
import { WeatherByLatLong } from '@hexagon/models/weather/WeatherByLatLong';
import { GetWeather, GetWeatherPayload } from './GetWeather';

describe('Récupération de la météo', () => {
  let getWeather: GetWeather;

  // Repositories
  let weatherRepository: WeatherRepositoryStub;

  beforeEach(() => {
    weatherRepository = new WeatherRepositoryStub();
    getWeather = new GetWeather(weatherRepository);
  });

  test('Doit récupérer la météo par ville lorsque city est renseigné', async () => {
    const data = {
      city: 'Paris',
    };
    const defaultWeather: WeatherByCity = {
      city: 'Paris',
      description: 'Nuageux',
      humidity: 50.3,
      temperature: 6.3,
    };
    weatherRepository.getByCityData = {
      [data.city]: defaultWeather,
    };

    const response = await getWeather.execute(data);
    expect(weatherRepository.getByCityParams).toEqual([{ city: data.city }]);
    expect(weatherRepository.getByLatLongParams).toEqual([]);
    expect(response).toEqual(defaultWeather);
  });

  test('Doit récupérer la météo par latitude et longitude', async () => {
    const data: GetWeatherPayload = {
      lat: 4.89,
      lng: 19.4,
    };
    const defaultWeather: WeatherByLatLong = {
      latitude: data.lat,
      longitude: data.lng,
      description: 'Nuageux',
      humidity: 50.3,
      temperature: 6.3,
    };
    weatherRepository.getByLatLongData = {
      [`${data.lat}-${data.lng}`]: defaultWeather,
    };

    const response = await getWeather.execute(data);
    expect(weatherRepository.getByLatLongParams).toEqual([{ latitude: data.lat, longitude: data.lng }]);
    expect(weatherRepository.getByCityParams).toEqual([]);
    expect(response).toEqual(defaultWeather);
  });
});
