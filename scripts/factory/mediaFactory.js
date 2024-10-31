import Image from "../models/imageModel.js";
import Video from "../models/videoModel.js";





/**
 * Factory function to create media objects.
 * 
 * @param {Object} data - The data object containing media information.
 * @param {string} [data.image] 
 * @param {string} [data.video] - The video file name, if the media is a video.
 * 
 * @returns {Image|Video} - Returns an instance of Image or Video based on the media type.
 * 
 * @throws {Error} Throws an error if the media type is unknown.
 */
/******  c16b8f19-66ae-4160-877d-bfc7c5e1430a  *******/
export default function mediaFactory(data, photographerName) {
    //contruit le chemin d'acces au media 
    const imagePath = `assets/photos/${photographerName}/${data.image}`;
    const videoPath = `assets/videos/${photographerName}/${data.video}`;

    //créer l'objet Media avec le chemin d'accès correct
    if (data.image) {
        return new Image(data, Image, imagePath);
    } else if (data.video) {
        return new Video(data, Video, videoPath);
    } else {
        throw new Error("Unknown media type");
    }
}

