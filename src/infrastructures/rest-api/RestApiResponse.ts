export interface RestApiResponse<T> {
  /**
   * Statut de la réponse
   */
  status: number
  /**
   * Contenu de la réponse
   */
  body: T
}
