 export default class LightBox extends HTMLElement {
    dialogElement = null
  
    constructor() {
      super();
  
     
  
      const lightboxTemplate = document.getElementById('lightbox-template-content')
      const lightboxTemplateContent = lightboxTemplate.content.cloneNode(true);
  
      // Attacher l'écouteur d'événements après avoir cloné le contenu
       lightboxTemplateContent.querySelector('.close').addEventListener('click', () => {
          this.close();
        })
      
  
      this.dialogElement = document.createElement('dialog');
      this.dialogElement.appendChild(
       lightboxTemplateContent)
      
  
      this.attachShadow({mode: 'open'}).appendChild(
        this.dialogElement
      )
    }
  
    open(mediaData) {
      const mediaContainer = this.shadowRoot.querySelector('.lightbox-template-content'); 
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
    isOpen
  }
  
  customElements.define('light-box', LightBox);