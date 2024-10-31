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
export default function mediaFactory(data) {
    if (data.image) {
        return new Image(data);
    } else if (data.video) {
        return new Video(data);
    } else {
        throw new Error("Unknown media type");
    }
}

