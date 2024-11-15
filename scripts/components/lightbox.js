export default class LightBox extends HTMLElement {
  dialogElement = null;
  currentIndex = 0;
  mediaElements = [];

  constructor() {
      super();
      const lightboxTemplate = document.getElementById('lightbox-template-content');
      const lightboxTemplateContent = lightboxTemplate.content.cloneNode(true);
      lightboxTemplateContent.querySelector('.close').addEventListener('click', () => {
          this.close();
      });

      this.dialogElement = document.createElement('dialog');
      this.dialogElement.appendChild(lightboxTemplateContent);

      this.attachShadow({ mode: 'open' });

      // Importer et injecter le CSS externe
      const linkElem = document.createElement('link');
      linkElem.setAttribute('rel', 'stylesheet');
      linkElem.setAttribute('href', './css/lightbox.css'); 
      this.shadowRoot.appendChild(linkElem);

      this.shadowRoot.appendChild(this.dialogElement);
  }

  open(mediaElements, index) {
      this.mediaElements = mediaElements;
      this.currentIndex = index;
      this.updateLightboxContent();
      this.dialogElement.showModal();
  }

  close() {
      this.dialogElement.close();
  }

  updateLightboxContent() {
      const mediaData = this.mediaElements[this.currentIndex];
      const mediaContainer = this.shadowRoot.querySelector('.lightbox-template-content');

      if (mediaContainer) {
          mediaContainer.innerHTML = ''; 

          if (mediaData.image) {
              const img = document.createElement('img');
              img.src = mediaData.image;
              img.alt = mediaData.title;
              mediaContainer.appendChild(img);
          } else if (mediaData.video) {
              const video = document.createElement('video');
              video.src = mediaData.video;
              video.controls = true;
              video.title = mediaData.title;
              mediaContainer.appendChild(video);
          }

          const prevButton = document.createElement('button');
          prevButton.textContent = 'Précédent';
          prevButton.classList.add('prev');
          prevButton.addEventListener('click', () => this.showPrevious());

          const nextButton = document.createElement('button');
          nextButton.textContent = 'Suivant';
          nextButton.classList.add('next');
          nextButton.addEventListener('click', () => this.showNext());

          mediaContainer.appendChild(prevButton);
          mediaContainer.appendChild(nextButton);
      } else {
          console.error('Le conteneur .lightbox-template-content est introuvable.');
      }
  }

  showPrevious() {
      this.currentIndex = (this.currentIndex - 1 + this.mediaElements.length) % this.mediaElements.length;
      this.updateLightboxContent();
  }

  showNext() {
      this.currentIndex = (this.currentIndex + 1) % this.mediaElements.length;
      this.updateLightboxContent();
  }
}

customElements.define('light-box', LightBox);
