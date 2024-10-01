export function getPhotographerIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  const photographerId = params.get('id');
  if (!photographerId) {
    console.error('ID du photographe non trouvé dans l\'URL.');
    return null; 
  }
  return parseInt(photographerId, 10); // Convertir l'ID en nombre
}
  
  export function getPhotographerURL() {
    return window.location.href;
  }