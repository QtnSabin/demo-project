import axios, { AxiosResponse } from 'axios';
import { RestApiProvider } from '../RestApiProvider';
import { RestApiResponse } from '../RestApiResponse';

export class AxiosRestApiProvider implements RestApiProvider {
  public async get<T>(
    url: string,
    params?: Record<string, unknown>,
    headers?: Record<string, string>,
  ): Promise<RestApiResponse<T>> {
    const response: AxiosResponse<T> = await axios.get(url + this.joinParams(params), { headers });
    return this.mapResponse(response);
  }

  private mapResponse<T>(response: AxiosResponse<T>): RestApiResponse<T> {
    return {
      status: response.status,
      body: response.data,
    };
  }

  private joinParams(params?: Record<string, unknown>) {
    if (!params) return '';
    const str = Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&');
    return `?${str}`;
  }
}
