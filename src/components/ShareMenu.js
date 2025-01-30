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
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16">
            <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
           </svg>
        </div>
          <span class="share-option-label">WhatsApp</span>
        </button>
        <button class="share-option" data-platform="instagram-dm">
          <div class="share-icon-wrapper" style="background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
              <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.92 3.92 0 0 0-1.417.923A3.92 3.92 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.94.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.92 3.92 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.92 3.92 0 0 0-.923-1.417A3.92 3.92 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
            </svg>
          </div>
          <span class="share-option-label">Instagram</span>
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
        <button class="share-option" data-platform="facebook">
          <div class="share-icon-wrapper" style="background: #1877F2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
             </svg>
          </div>
          <span class="share-option-label">Facebook</span>
        </button>
        <button class="share-option" data-platform="twitter">
          <div class="share-icon-wrapper" style="background:rgb(0, 0, 0)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-twitter-x" viewBox="0 0 16 16">
              <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
            </svg>
          </div>
          <span class="share-option-label">Twitter X</span>
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
      whatsapp: `https://api.whatsapp.com/send?text=${text}%20${encodeURIComponent(shareUrl)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${text}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      'instagram-dm': `https://www.instagram.com/direct/inbox/`
    };

    if (platform === 'instagram-dm') {
      navigator.clipboard.writeText(shareUrl).then(() => {
        showToast('Link copiado!');
        window.location.href = shareUrls[platform];
      });
    } else {
      window.location.href = shareUrls[platform];
    }
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