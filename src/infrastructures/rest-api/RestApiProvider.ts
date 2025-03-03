import { RestApiResponse } from './RestApiResponse';

export interface RestApiProvider {
  /**
   * Execute une requête avec la méthode GET
   * @param url URL de la cible
   * @param params Paramètre de la query
   * @param headers Headers
   */
  get<T>(url: string, params?: Record<string, unknown>, headers?: Record<string, string>): Promise<RestApiResponse<T>>
  /**
   * Execute une requête avec la méthode POST
   * @param url URL de la cible
   * @param payload Paramètres du body
   * @param params Paramètres de la query
   * @param headers Headers
   */
  post<T>(url: string, payload?: any, params?: Record<string, unknown>, headers?: Record<string, string>): Promise<RestApiResponse<T>>
}
