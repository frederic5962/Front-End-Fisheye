import Image from '../models/imageModel.js';
import Video from '../models/videoModel.js';

/**
 * @param {Object} data - L'objet contenant les informations sur le média.
 * @param {string} [data.image] - Le nom du fichier image, si le média est une image.
 * @param {string} [data.video] - Le nom du fichier vidéo, si le média est une vidéo.
 * @returns {Image|Video} - Retourne une instance de Image ou de Video en fonction du type de média.
 * @throws {Error} Lance une erreur si le type de média est inconnu.
 */
export default function mediaFactory(data) {
  if (data.image) {
    return new Image(data);
  } else if (data.video) {
    return new Video(data);
  } else {
    throw new Error('Unknown media type');
  }
}
