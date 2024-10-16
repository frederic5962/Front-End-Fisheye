export class Lightbox {
  constructor() {
    if (Lightbox.instance) {
      return Lightbox.instance;
    }
    Lightbox.instance = this;
    this.mediaElements = [];
    this.currentIndex = 0;
  }

  open(mediaElements, startIndex = 0) {
    this.mediaElements = mediaElements; // Stocke le tableau des médias
    this.currentIndex = startIndex; // Définit l'index de départ

    // Affiche le média initial
    this.displayMedia(this.mediaElements[this.currentIndex]);

    // Gère les événements de navigation
    this.addNavigation();
  }

  displayMedia(mediaElement) {
    // Vérifie que le mediaElement n'est pas indéfini
    if (!mediaElement) {
      console.error('mediaElement is undefined or invalid');
      return;
    }

    // Ferme l'ancienne lightbox avant d'en ouvrir une nouvelle
    this.close();

    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');

    const lightboxContent = document.createElement('div');
    lightboxContent.classList.add('lightbox-content');

    const closeButton = document.createElement('button');
    closeButton.classList.add('lightbox-close');
    closeButton.innerHTML = '&times;';
    closeButton.addEventListener('click', () => this.close());

    lightboxContent.appendChild(closeButton);

    const previousButton = document.createElement('button');
    previousButton.classList.add('lightbox-previous');
    previousButton.innerHTML = '&lt;';
    previousButton.addEventListener('click', () => this.previous());

    const nextButton = document.createElement('button');
    nextButton.classList.add('lightbox-next');
    nextButton.innerHTML = '&gt;';
    nextButton.addEventListener('click', () => this.next());

    lightboxContent.appendChild(previousButton);
    lightboxContent.appendChild(nextButton);


    // Ajoute le titre au contenu de la lightbox
    if (mediaElement.alt) {
      const title = document.createElement('h2');
      title.textContent = mediaElement.alt;
      lightboxContent.appendChild(title);
    }


    // Gestion des différents types de médias (image, vidéo, audio)
    if (mediaElement.tagName === 'IMG') {
      const img = document.createElement('img');
      img.src = mediaElement.src;
      img.alt = mediaElement.alt || '';
      lightboxContent.appendChild(img);
    } else if (mediaElement.tagName === 'VIDEO') {
      const video = document.createElement('video');
      video.src = mediaElement.src;
      video.controls = true;
      lightboxContent.appendChild(video);
    } else if (mediaElement.tagName === 'AUDIO') {
      const audio = document.createElement('audio');
      audio.src = mediaElement.src;
      audio.controls = true;
      lightboxContent.appendChild(audio);
    }

    lightbox.appendChild(lightboxContent);
    document.body.appendChild(lightbox);
  }

  close() {
    const lightbox = document.querySelector('.lightbox');
    if (lightbox) {
      lightbox.remove();
    }
  }

  next() {
    // Passe au média suivant dans la liste
    if (this.currentIndex < this.mediaElements.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // Recommence depuis le début si à la fin
    }
    this.displayMedia(this.mediaElements[this.currentIndex]);
  }

  previous() {
    // Passe au média précédent dans la liste
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.mediaElements.length - 1; // Recommence depuis la fin si au début
    }
    this.displayMedia(this.mediaElements[this.currentIndex]);
  }

  addNavigation() {
    // Ajoute la navigation avec le clavier (flèches gauche et droite)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        this.next();
      } else if (e.key === 'ArrowLeft') {
        this.previous();
      }
    });
  }

  static open(mediaElements, startIndex = 0) {
    const lightbox = new Lightbox();
    lightbox.open(mediaElements, startIndex);
  }

  static close() {
    const lightbox = new Lightbox();
    lightbox.close();
  }
}
