export default class Api {
        constructor(url) {
        this.url = url;
    }
    /**
     * Récupère la liste des photographes à partir de l'URL de l'API
     * 
     * @returns {Promise<object[]>} 
     */
    async getPhotographers() {
        const response = await fetch(this.url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        
    }
}
