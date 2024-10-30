export default class Api {

    constructor(url) {
        this.url = url;
    }

    async getPhotographers() {
        const response = await fetch(this.url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        
    }
}