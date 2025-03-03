import axios from 'axios';
import { AxiosRestApiProvider } from './AxiosRestApiProvider';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Appel de la méthode POST de axios', () => {
  let restApiProvider: AxiosRestApiProvider;

  beforeEach(() => {
    restApiProvider = new AxiosRestApiProvider();
  });

  test('Doit appeler axios.post avec les paramètres formattés', async () => {
    const url = 'https://example.com';
    const params = {
      key1: 'value1',
      key2: 'value2',
    };
    const payload = {
      mail: 'mail@mail.com',
    };
    const headers = { Authorization: 'Bearer token' };
    const mockResponse = {
      status: 200,
      data: { result: 'success' },
    };

    mockedAxios.post.mockResolvedValue(mockResponse);

    const result = await restApiProvider.post(url, payload, params, headers);
    expect(mockedAxios.post).toHaveBeenCalledWith(
      `${url}?key1=value1&key2=value2`,
      payload,
      { headers },
    );
    expect(result.status).toEqual(mockResponse.status);
    expect(result.body).toEqual(mockResponse.data);
  });

  test('Doit gérer l\'absence de paramètres dans l\'URL', async () => {
    const url = 'https://example.com';
    const mockResponse = {
      status: 200,
      data: { result: 'success' },
    };

    mockedAxios.post.mockResolvedValue(mockResponse);
    const result = await restApiProvider.post(url);
    expect(mockedAxios.post).toHaveBeenCalledWith(url, undefined, {});
    expect(result.status).toEqual(mockResponse.status);
    expect(result.body).toEqual(mockResponse.data);
  });
});
