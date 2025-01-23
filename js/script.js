const videos = [
    {
        id: '1',
        url: './img/modelo2.MP4',
        username: 'Michelly Cardoso',
        description: 'Será que desse ângulo fica bom? 🤭',
        hashtags: '#CandyPacks #Viral #Trendy',
        music: 'som original - dgs.oficiall',
        likes: '167.5K',
        comments: '14.8K',
        bookmarks: '4.1K',
        shares: '14.2K',
        userProfile: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=64&h=64&fit=crop'
    },
    {
        id: '2',
        url: './img/modelo3.MP4',
        username: 'Sarah Beaulty',
        description: '🌸 Rosa é minha cor favorita',
        hashtags: '#nature #beautiful #pink',
        music: 'som original - nature.vibes',
        likes: '223.4K',
        comments: '18.2K',
        bookmarks: '5.2K',
        shares: '20.1K',
        userProfile: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop'
    }
];

function createVideoElement(video) {
    const container = document.createElement('div');
    container.className = 'video-container';

    container.innerHTML = `
      <video src="${video.url}" loop muted playsinline></video>
      <div class="time-display">0:00 / 0:00</div>
     <div class="sub-progress-bar">
       <div class="progress-bar">
         <div class="progress-dot"></div>
       </div>
     </div>
      <div class="video-info">
        <div class="username">
          ${video.username}
          <button class="follow-button">Seguir</button>
        </div>
        <div class="description">${video.description}</div>
        <div class="hashtags">${video.hashtags}</div>
        <div class="music">
          <svg class="music-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 18V5l12-2v13"/>
            <circle cx="6" cy="18" r="3"/>
            <circle cx="18" cy="16" r="3"/>
          </svg>
          ${video.music}
        </div>
      </div>
      <div class="video-actions">
        <div class="user-profile">
          <img src="${video.userProfile}" alt="Profile">
        </div>
        <button class="action-button" data-action="like">
          <div class="icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
            </svg>
          </div>
          <span class="count">${video.likes}</span>
        </button>
        <button class="action-button" data-action="comment">
          <div class="icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
          </div>
          <span class="count">${video.comments}</span>
        </button>
        <button class="action-button" data-action="bookmark">
          <div class="icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
            </svg>
          </div>
          <span class="count">${video.bookmarks}</span>
        </button>
        <button class="action-button" data-action="share">
          <div class="icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
              <polyline points="16 6 12 2 8 6"/>
              <line x1="12" x2="12" y1="2" y2="15"/>
            </svg>
          </div>
          <span class="count">${video.shares}</span>
        </button>
      </div>
    `;

    return container;
}

function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function initializeFeed() {
  const feed = document.getElementById('feed');
  let isInteracting = false;

  videos.forEach((video) => {
    const videoElement = createVideoElement(video);
    feed.appendChild(videoElement);

    const videoTag = videoElement.querySelector('video');
    const subProgressBar = videoElement.querySelector('.sub-progress-bar');
    const progressBar = videoElement.querySelector('.progress-bar');
    const progressDot = videoElement.querySelector('.progress-dot');
    const timeDisplay = videoElement.querySelector('.time-display');
    const videoInfo = videoElement.querySelector('.video-info');
    const videoActions = videoElement.querySelector('.video-actions');
    
    // Adiciona as tags para os tempos separados
    const currentTimeSpan = document.createElement('span');
    currentTimeSpan.classList.add('current-time');
    const totalTimeSpan = document.createElement('span');
    totalTimeSpan.classList.add('total-time');
    timeDisplay.innerHTML = '';  // Limpa o conteúdo original
    timeDisplay.appendChild(currentTimeSpan);
    timeDisplay.appendChild(document.createTextNode(' / '));
    timeDisplay.appendChild(totalTimeSpan);

    videoTag.addEventListener('loadedmetadata', () => {
        totalTimeSpan.textContent = formatTime(videoTag.duration);
    });

    videoTag.addEventListener('timeupdate', () => {
        const percentage = (videoTag.currentTime / videoTag.duration) * 100;
        progressBar.style.width = `${percentage}%`;
        progressDot.style.transform = `translate(${percentage}%, -50%)`;
        
        if (!isInteracting) {
            currentTimeSpan.textContent = formatTime(videoTag.currentTime);
        }
    });

    const startInteraction = (event) => {
        isInteracting = true;
        subProgressBar.classList.add('interacting');
        
        // Oculta os controles de todos os vídeos
        document.querySelectorAll('.video-info').forEach(info => info.classList.add('hidden'));
        document.querySelectorAll('.video-actions').forEach(actions => actions.classList.add('hidden'));
        document.querySelectorAll('.time-display').forEach(timer => timer.classList.add('visible'));
        
        updateProgress(event);
        feed.style.overflowY = 'hidden';
    };

    const stopInteraction = () => {
        if (isInteracting) {
            isInteracting = false;
            subProgressBar.classList.remove('interacting');
            
            // Mostra os controles de todos os vídeos
            document.querySelectorAll('.video-info').forEach(info => info.classList.remove('hidden'));
            document.querySelectorAll('.video-actions').forEach(actions => actions.classList.remove('hidden'));
            document.querySelectorAll('.time-display').forEach(timer => timer.classList.remove('visible'));
            
            feed.style.overflowY = 'scroll';
        }
    };

    const updateProgress = (event) => {
        if (!isInteracting) return;

        const rect = subProgressBar.getBoundingClientRect();
        const offsetX = event.touches ? event.touches[0].clientX : event.clientX;
        const percentage = Math.max(0, Math.min(1, (offsetX - rect.left) / rect.width));

        videoTag.currentTime = percentage * videoTag.duration;
        currentTimeSpan.textContent = formatTime(videoTag.currentTime);
        progressBar.style.width = `${percentage * 100}%`;
        progressDot.style.transform = `translate(${percentage * 100}%, -50%)`;
    };

    subProgressBar.addEventListener('mousedown', startInteraction);
    subProgressBar.addEventListener('mousemove', updateProgress);
    document.addEventListener('mouseup', stopInteraction);

    subProgressBar.addEventListener('touchstart', startInteraction);
    subProgressBar.addEventListener('touchmove', updateProgress);
    document.addEventListener('touchend', stopInteraction);
  });

  // Ajustar opacidade ao rolar, mas não enquanto a barra está sendo manipulada
  feed.addEventListener('scroll', () => {
    if (!isInteracting) {
      document.querySelectorAll('.sub-progress-bar').forEach((bar) => {
        bar.style.opacity = '0';
      });

      clearTimeout(feed.scrollTimeout);

      // Restaurar opacidade após rolagem
      feed.scrollTimeout = setTimeout(() => {
        document.querySelectorAll('.sub-progress-bar').forEach((bar) => {
          bar.style.opacity = '1';
        });
      }, 300);
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target.querySelector('video');
        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      });
    },
    { threshold: 0.5 } 
  );
  
  document.querySelectorAll('.video-container').forEach((container) => {
    observer.observe(container);
  });

    // Handle interactions
    document.addEventListener('click', (e) => {
        const video = e.target.closest('video');
        const actionButton = e.target.closest('.action-button');
        const followButton = e.target.closest('.follow-button');

        if (video) {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        }

        if (actionButton) {
            const action = actionButton.dataset.action;
            handleAction(action, actionButton);
        }

        if (followButton) {
            handleFollow(followButton);
        }
    });


function handleAction(action, button, isDoubleClick = false) {
    const count = button.querySelector('.count');
    const videoContainer = button.closest('.video-container');
    const videoIndex = Array.from(videoContainer.parentNode.children).indexOf(videoContainer);
    const video = videos[videoIndex];

    switch (action) {
        case 'like':
            if (!isDoubleClick) {
                if (!button.classList.contains('liked')) {
                    button.classList.add('liked');
                    let currentLikes = parseInt(count.textContent.replace(/[^0-9]/g, ''));
                    if (currentLikes < 1000) {
                        count.textContent = currentLikes + 1;
                    }
                } else {
                    button.classList.remove('liked');
                    let currentLikes = parseInt(count.textContent.replace(/[^0-9]/g, ''));
                    if (currentLikes < 1000) {
                        count.textContent = currentLikes - 1;
                    }
                }
            } else {
                if (!button.classList.contains('liked')) {
                    button.classList.add('liked');
                    let currentLikes = parseInt(count.textContent.replace(/[^0-9]/g, ''));
                    if (currentLikes < 1000) {
                        count.textContent = currentLikes + 1;
                    }
                }
            }
            break;
        case 'bookmark':
            button.classList.toggle('bookmarked');
            break;
        case 'share':
            handleShare(video);
            break;
        case 'comment':
            handleComment(video);
            break;
    }
}

function handleComment(video) {
    const commentModal = document.createElement('div');
    commentModal.className = 'comment-modal';

    const commentOverlay = document.createElement('div');
    commentOverlay.className = 'comment-overlay';

    commentModal.innerHTML = `
        <div class="comment-header">
            <span class="comment-count">${video.comments} comentários</span>
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
                <h3>Exclusivo para VIPs </h3>
                <p>Você deve ser VIP para fazer comentários</p>
            </div>
        </div>
    `;

    document.body.appendChild(commentOverlay);
    document.body.appendChild(commentModal);

    requestAnimationFrame(() => {
        commentOverlay.classList.add('active');
        commentModal.classList.add('active');
    });

    const closeButton = commentModal.querySelector('.comment-close');
    const closeModal = () => {
        commentOverlay.classList.remove('active');
        commentModal.classList.remove('active');
        setTimeout(() => {
            commentOverlay.remove();
            commentModal.remove();
        }, 300);
    };

    closeButton.addEventListener('click', closeModal);
    commentOverlay.addEventListener('click', (e) => {
        if (e.target === commentOverlay) {
            closeModal();
        }
    });
}

const style = document.createElement('style');
style.textContent = `
    .vip-message {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 2rem;
        height: 100%;
        color: white;
    }

    .vip-icon {
        margin-bottom: 0.3rem;
        color: #FE2C55;
    }

    .vip-message h3 {
        font-size: 1.65rem;
        margin-bottom: 0.5rem;
        color: #FE2C55;
    }

    .vip-message p {
        font-size: 0.9rem;
        margin-bottom: 1.5rem;
        color: rgba(255, 255, 255, 0.67);
    }

`;
document.head.appendChild(style);
let lastTap = 0;
document.addEventListener('touchstart', (e) => {
    const video = e.target.closest('video');
    if (!video) return;

    const currentTime = Date.now();
    const tapLength = currentTime - lastTap;

    if (tapLength < 300 && tapLength > 0) {
        const container = video.closest('.video-container');
        const likeButton = container.querySelector('[data-action="like"]');

        if (likeButton) {
            handleAction('like', likeButton, true); 
        }

        const touchX = e.changedTouches[0].clientX;
        const touchY = e.changedTouches[0].clientY;

        const heart = document.createElement('ion-icon');
        heart.name = 'heart';
        heart.classList.add('heart-icon');
        document.body.appendChild(heart);

        heart.style.left = `${touchX - 25}px`; 
        heart.style.top = `${touchY - 25}px`;  

        setTimeout(() => {
            heart.classList.add('animate-heart');
        }, 0);

        setTimeout(() => {
            heart.remove();
        }, 1000);

        e.preventDefault(); 
    }

    lastTap = currentTime;
});
}

function handleFollow(button) {
    button.textContent = button.textContent === 'Seguir' ? 'Seguindo' : 'Seguir';
    button.classList.toggle('following');
}
function handleShare(video) {
    const shareMenu = document.createElement('div');
    shareMenu.className = 'share-menu';

    const shareOverlay = document.createElement('div');
    shareOverlay.className = 'share-overlay';

    const videoUrl = window.location.href;

    shareMenu.innerHTML = `
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
      <input type="text" value="${videoUrl}" readonly>
      <button class="copy-button">Copiar</button>
    </div>
  `;

    document.body.appendChild(shareOverlay);
    document.body.appendChild(shareMenu);

    requestAnimationFrame(() => {
        shareOverlay.classList.add('active');
        shareMenu.classList.add('active');
    });

    shareMenu.querySelectorAll('.share-option').forEach(option => {
        option.addEventListener('click', () => {
            const platform = option.dataset.platform;
            shareToSocialMedia(platform, videoUrl, video);
        });
    });

    const copyButton = shareMenu.querySelector('.copy-button');
    const linkInput = shareMenu.querySelector('input');

    copyButton.addEventListener('click', () => {
        linkInput.select();
        document.execCommand('copy');
        showToast('Link copiado!');
    });

    const closeButton = shareMenu.querySelector('.share-menu-close');
    const closeMenu = () => {
        shareOverlay.classList.remove('active');
        shareMenu.classList.remove('active');
        setTimeout(() => {
            shareOverlay.remove();
            shareMenu.remove();
        }, 300);
    };

    closeButton.addEventListener('click', closeMenu);
    shareOverlay.addEventListener('click', closeMenu);
}

function shareToSocialMedia(platform, url, video) {
    const text = encodeURIComponent(`Confira este vídeo incrível! ${video.description}`);
    const shareUrls = {
        whatsapp: `https://api.whatsapp.com/send?text=${text}%20${url}`,
        telegram: `https://t.me/share/url?url=${url}&text=${text}`,
        twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`
    };

    window.open(shareUrls[platform], '_blank');
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add('active');
    });

    setTimeout(() => {
        toast.classList.remove('active');
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}
document.addEventListener('DOMContentLoaded', initializeFeed);