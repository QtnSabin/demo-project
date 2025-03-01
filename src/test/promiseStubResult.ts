/**
 * Renvoie la réponse sous forme de promesse résolue au prochain tick.
 * Permet de valider l'utilisation du await.
 * @param callback Comportement du stub
 */
export const promisifyResult = <T>(callback: () => T) => (
  new Promise<T>((resolve, reject) => {
    process.nextTick(() => {
      try {
        resolve(callback());
      } catch (error) {
        reject(error);
      }
    });
  })
);
