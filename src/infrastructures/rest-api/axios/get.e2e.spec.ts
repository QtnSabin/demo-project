import axios from 'axios';
import { AxiosRestApiProvider } from './AxiosRestApiProvider';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Appel de la méthode GET de axios', () => {
  let restApiProvider: AxiosRestApiProvider;

  beforeEach(() => {
    restApiProvider = new AxiosRestApiProvider();
  });

  test('Doit appeler axios.get avec les paramètres formattés', async () => {
    const url = 'https://example.com';
    const params = {
      key1: 'value1',
      key2: 'value2',
    };
    const headers = { Authorization: 'Bearer token' };
    const mockResponse = {
      status: 200,
      data: { result: 'success' },
    };

    mockedAxios.get.mockResolvedValue(mockResponse);

    const result = await restApiProvider.get(url, params, headers);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${url}?key1=value1&key2=value2`,
      { headers },
    );
    expect(result.status).toBe(mockResponse.status);
    expect(result.body).toBe(mockResponse.data);
  });

  test('Doit gérer l\'absence de paramètres dans l\'URL', async () => {
    const url = 'https://example.com';
    const mockResponse = {
      status: 200,
      data: { result: 'success' },
    };

    mockedAxios.get.mockResolvedValue(mockResponse);
    const result = await restApiProvider.get(url);
    expect(mockedAxios.get).toHaveBeenCalledWith(url, {});
    expect(result.status).toBe(mockResponse.status);
    expect(result.body).toBe(mockResponse.data);
  });
});
