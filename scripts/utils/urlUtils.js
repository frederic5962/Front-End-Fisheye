export function getPhotographerIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
  }
  
  export function getPhotographerURL() {
    return window.location.href;
  }