export default class Photographer {
    /**
     * Constructor for Photographer
     * @param {Object} data - object containing photographer data
     * @param {number} data.id - id of the photographer
     * @param {string} data.name - name of the photographer
     * @param {string} data.city - city of the photographer
     * @param {string} data.country - country of the photographer
     * @param {string} data.tagline - tagline of the photographer
     * @param {number} data.price - price of the photographer
     * @param {string} data.portrait - path to the portrait of the photographer
     */
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.city = data.city;
        this.country = data.country;
        this.tagline = data.tagline;
        this.price = data.price;
        this.portrait = data.portrait;
    }
}