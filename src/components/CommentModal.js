export class CommentModal {
  constructor(video) {
    this.video = video;
    this.createModal();
    this.initializeEvents();
  }

  createModal() {
    this.modal = document.createElement('div');
    this.modal.className = 'comment-modal';

    this.overlay = document.createElement('div');
    this.overlay.className = 'comment-overlay';

    this.modal.innerHTML = `
      <div class="comment-header">
        <span class="comment-count">${this.video.comments} comentários</span>
        <button class="comment-close">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="comments-container">
        <div class="vip-message">
          <div class="vip-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 20h20"/>
              <path d="m5.5 12.5 4-4c1-1 2.7-1 3.7 0l4.3 4"/>
              <path d="m18 12.7-1.2-1.2c-1-1-2.7-1-3.7 0L10 14.6"/>
            </svg>
          </div>
          <h3>Exclusivo para VIPs</h3>
          <p>Você deve ser VIP para fazer comentários</p>
        </div>
      </div>
    `;
  }

  initializeEvents() {
    const closeButton = this.modal.querySelector('.comment-close');
    closeButton.addEventListener('click', () => this.close());
    this.overlay.addEventListener('click', () => this.close());
  }

  show() {
    document.body.appendChild(this.overlay);
    document.body.appendChild(this.modal);

    requestAnimationFrame(() => {
      this.overlay.classList.add('active');
      this.modal.classList.add('active');
    });
  }

  close() {
    this.overlay.classList.remove('active');
    this.modal.classList.remove('active');
    setTimeout(() => {
      this.overlay.remove();
      this.modal.remove();
    }, 300);
  }
}