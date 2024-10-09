export class Lightbox {
  constructor() {
    if (Lightbox.instance) {
      return Lightbox.instance;
    }
    Lightbox.instance = this;
  }

  static open(media) { // Modification ici : on prend "media" en paramètre au lieu de "image"
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    lightbox.innerHTML = `
        <div class="lightbox-content">
          ${media.tagName === 'IMG' ? `<img src="${media.src}" alt="${media.alt}">` : `<video src="${media.src}" controls></video>`}
          <button class="lightbox-close" aria-label="Close">&times;</button>
        </div>
      `;
    document.body.appendChild(lightbox);

    const closeButton = lightbox.querySelector('.lightbox-close');
    closeButton.addEventListener('click', () => {
      document.body.removeChild(lightbox);
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        document.body.removeChild(lightbox);
      }
    });
  }

  static init() {
    const images = document.querySelectorAll('.lightbox-link');
    images.forEach(image => {
      image.addEventListener('click', event => {
        event.preventDefault();
        Lightbox.open(image); 
      });
    });
  }
}