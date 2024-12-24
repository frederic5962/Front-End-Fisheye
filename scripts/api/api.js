export default class Api {
  /**
   * * Crée une instance de Api.
   * @param {string} url - L'URL de l'API.
   */ constructor(url) {
    this.url = url;
  }
  /**
   * Récupère la liste des photographes à partir de l'URL de l'API
   * * @returns {Promise<object[]>} Une promesse qui résout un tableau d'objets photographes.
   * @throws {Error} Lance une erreur si la requête échoue.
   */
  async getPhotographers() {
    try {
      const response = await fetch(this.url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      const errorMessage = document.createElement('div');
      errorMessage.setAttribute('role', 'alert');
      errorMessage.innerText =
        'Une erreur est survenue lors de la récupération des photographes.';
      document.body.appendChild(errorMessage);
      throw error; 
    }
  }
}
