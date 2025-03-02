import { RestApiResponse } from './RestApiResponse';

export interface RestApiProvider {
  /**
   * Execute une requête avec la méthode GET
   * @param url URL de la cible
   * @param params Paramètre de la query
   * @param headers Headers
   */
  get<T>(url: string, params?: Record<string, unknown>, headers?: Record<string, string>): Promise<RestApiResponse<T>>
}
