import { promisifyResult } from '@test/promiseStubResult';
import { RestApiProvider } from './RestApiProvider';
import { RestApiResponse } from './RestApiResponse';

export class RestApiProviderStub implements RestApiProvider {
  private readonly _getParams: Array<Record<string, unknown>> = [];
  private _getData!: Record<string, RestApiResponse<any>>;

  public async get<T>(
    url: string,
    params?: Record<string, unknown>,
    headers?: Record<string, string>,
  ): Promise<RestApiResponse<T>> {
    this._getParams.push({ url, params, headers });
    return promisifyResult(() => this._getData[url]);
  }

  public set getData(data: Record<string, RestApiResponse<any>>) {
    this._getData = data;
  }

  public get getParams() {
    return this._getParams;
  }
}
