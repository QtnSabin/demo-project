export interface LogProvider {
  /**
   * Ajoute un log d'information.
   */
  info(message: string): void

  /**
   * Ajoute un log d'erreur.
   */
  error(message: string): void
}
