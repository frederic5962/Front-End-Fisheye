import Media from "../models/media.js";


export default class Video extends Media {

    constructor(data) { 
        super(data);
        this.video = `./assets/photos/${data.photographerId}/${data.video}`;
    }
}