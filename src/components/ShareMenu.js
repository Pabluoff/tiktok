import { generateShareUrl } from '../utils/url.js';
import { showToast } from '../utils/toast.js';

export class ShareMenu {
  constructor(video, videoUrl) {
    this.video = video;
    this.videoUrl = videoUrl;
    this.createMenu();
    this.initializeEvents();
  }

  createMenu() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'share-overlay';

    this.menu = document.createElement('div');
    this.menu.className = 'share-menu';

    const shareUrl = generateShareUrl(this.video.id);

    this.menu.innerHTML = `
      <div class="share-menu-header">
        <span class="share-menu-title">Compartilhar com</span>
        <button class="share-menu-close">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="share-options">
        <button class="share-option" data-platform="whatsapp">
          <div class="share-icon-wrapper" style="background: #25D366">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
          </div>
          <span class="share-option-label">WhatsApp</span>
        </button>
        <button class="share-option" data-platform="telegram">
          <div class="share-icon-wrapper" style="background: #0088cc">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </div>
          <span class="share-option-label">Telegram</span>
        </button>
        <button class="share-option" data-platform="twitter">
          <div class="share-icon-wrapper" style="background: #1DA1F2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
            </svg>
          </div>
          <span class="share-option-label">Twitter</span>
        </button>
        <button class="share-option" data-platform="facebook">
          <div class="share-icon-wrapper" style="background: #1877F2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </div>
          <span class="share-option-label">Facebook</span>
        </button>
      </div>
      <div class="share-link">
        <input type="text" value="${shareUrl}" readonly>
        <button class="copy-button">Copiar</button>
      </div>
    `;
  }

  initializeEvents() {
    this.menu.querySelectorAll('.share-option').forEach(option => {
      option.addEventListener('click', () => {
        const platform = option.dataset.platform;
        this.shareToSocialMedia(platform);
      });
    });

    const copyButton = this.menu.querySelector('.copy-button');
    const linkInput = this.menu.querySelector('input');

    copyButton.addEventListener('click', () => {
      linkInput.select();
      document.execCommand('copy');
      showToast('Link copiado!');
    });

    const closeButton = this.menu.querySelector('.share-menu-close');
    closeButton.addEventListener('click', () => this.close());
    this.overlay.addEventListener('click', () => this.close());
  }

  shareToSocialMedia(platform) {
    const shareUrl = generateShareUrl(this.video.id);
    const text = this.getRandomShareText();
    
    const shareUrls = {
      whatsapp: `https://api.whatsapp.com/send?text=${text}%20${shareUrl}`,
      telegram: `https://t.me/share/url?url=${shareUrl}&text=${text}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`
    };

    window.open(shareUrls[platform], '_blank');
  }

  getRandomShareText() {
    const texts = [
      `👀 Olha o vídeo de ${this.video.username}`,
      `Olha ${this.video.username} nesse vídeo 😳`,
      `Nossa.... ${this.video.username}, tem um talento incrível🔥 `,
      `O que ${this.video.username} fez nesse vídeo? Você não vai acreditar...`,
      `Sabe aquele vídeo que te deixa com vontade de ver mais? É esse de ${this.video.username}!`,
      `Se você acha que já viu tudo, espere até ver esse vídeo de ${this.video.username}!`
    ];

    const randomIndex = Math.floor(Math.random() * texts.length);
    return encodeURIComponent(texts[randomIndex]);
  }

  show() {
    document.body.appendChild(this.overlay);
    document.body.appendChild(this.menu);

    requestAnimationFrame(() => {
      this.overlay.classList.add('active');
      this.menu.classList.add('active');
    });
  }

  close() {
    this.overlay.classList.remove('active');
    this.menu.classList.remove('active');
    setTimeout(() => {
      this.overlay.remove();
      this.menu.remove();
    }, 300);
  }
}