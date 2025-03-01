export interface DateManager {
  /**
   * Envoie la date au format `YYYY/MM/DD-HH:mm:ss`.
   * @param date Date
   */
  formatAsDateTime(date: Date): string
}
