export default class LightBox extends HTMLElement {
    dialogElement = null;
  
    constructor() {
      super();
  
      // Attacher le Shadow DOM
      this.attachShadow({ mode: 'open' }); 
      console.log(this.shadowRoot);
  
      const lightboxTemplate = this.shadowRoot.querySelector('template');
      const lightboxTemplateContent = lightboxTemplate.content.cloneNode(true);
  
      // Attacher l'écouteur d'événements après avoir cloné le contenu
      const closeButton = lightboxTemplateContent.querySelector('.close'); 
      if (closeButton) {
        closeButton.addEventListener('click', () => {
          this.close();
        });
      } else {
        console.error("Bouton de fermeture non trouvé dans le template.");
      }
  
      this.dialogElement = document.createElement('dialog');
  
      // Ajouter les éléments du template au dialog
      lightboxTemplateContent.querySelectorAll('*').forEach(element => {
        this.dialogElement.appendChild(element);
      });
  
      this.shadowRoot.appendChild(this.dialogElement);
    }
  
    open(mediaData) {
      const mediaContainer = this.shadowRoot.querySelector('.lightbox-content'); 
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
  
      this.dialogElement.showModal(); 
    }
  
    close() {
      this.dialogElement.close();
    }
  }
  
  customElements.define('light-box', LightBox);