import Media from "../models/media.js";

export default class Image extends Media {

    /**
     * Initializes an Image instance with the provided data.
     * 
     * @param {Object} data - The data object containing image information.
     * @param {string} data.image - The filename of the image.
     */

    constructor(data) {
        super(data);
        this.image = data.image;
    }
}