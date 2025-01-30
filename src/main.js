import { VideoPlayer } from './components/VideoPlayer.js';
import { ShareMenu } from './components/ShareMenu.js';
import { CommentModal } from './components/CommentModal.js';
import { loadStorageState, saveToStorage } from './services/storage.js';
import { getVideoIdFromUrl } from './utils/url.js';
import { parseValue, formatValue } from './utils/format.js';
import { videos } from './data/videos.js';

class VideoFeed {
  constructor() {
    this.feed = document.getElementById('feed');
    this.storageState = loadStorageState();
    this.players = [];
    this.lastTap = 0;
    this.initialize();
  }

  initialize() {
    if (!sessionStorage.getItem('pageLoaded')) {
      sessionStorage.setItem('pageLoaded', 'true');
    } else {
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.delete('v');
      window.history.replaceState(null, '', window.location.pathname + '?' + urlParams.toString());
      sessionStorage.removeItem('pageLoaded');
    }

    const sharedVideoId = getVideoIdFromUrl();
    if (sharedVideoId) {
      this.reorderVideos(sharedVideoId);
    }

    this.renderVideos();
    this.initializeObserver();
    this.initializeEvents();
  }

  reorderVideos(sharedVideoId) {
    const videoIndex = videos.findIndex(video => video.id === sharedVideoId);
    if (videoIndex !== -1) {
      const [highlightedVideo] = videos.splice(videoIndex, 1);
      videos.unshift(highlightedVideo);
    }
  }

  createVideoElement(video, isShared = false) {
    const container = document.createElement('div');
    container.className = 'video-container';

    const isLiked = this.storageState.likedVideos[video.id] === true;
    const isBookmarked = this.storageState.bookmarkedVideos[video.id] === true;
    const likedClass = isLiked ? 'liked' : '';
    const bookmarkedClass = isBookmarked ? 'bookmarked' : '';

    const sharedBadgeHTML = isShared ? `
      <div class="shared-badge-container">
        <div class="shared-badge">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
            <polyline points="16 6 12 2 8 6"/>
            <line x1="12" x2="12" y1="2" y2="15"/>
          </svg>
          <span>Vídeo compartilhado com você</span>
        </div>
      </div>
    ` : '';

    container.innerHTML = `
      ${sharedBadgeHTML}
      <video src="${video.url}" loop muted playsinline></video>
      <div class="time-display">
        <span class="current-time">0:00</span> / <span class="total-time">0:00</span>
      </div>
      <div class="sub-progress-bar">
        <div class="progress-bar">
          <div class="progress-dot"></div>
        </div>
      </div>
      <div class="video-info">
        <div class="username">${video.username}</div>
        <div class="description">${video.description}</div>
        <div class="hashtags">${video.hashtags}</div>
        <div class="music">
          <svg class="music-icon" xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" viewBox="0 0 16 16">
            <path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13s1.12-2 2.5-2 2.5.896 2.5 2m9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2"/>
            <path fill-rule="evenodd" d="M14 11V2h1v9zM6 3v10H5V3z"/>
            <path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4z"/>
          </svg>
          ${video.music}
        </div>
      </div>
      <div class="video-actions">
        <button class="follow-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14"/>
            <path d="M12 5v14"/>
          </svg>
        </button>
        <div class="user-profile">
          <img src="${video.userProfile}" alt="Profile">
        </div>
        <button class="action-button ${likedClass}" data-action="like">
          <div class="icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
            </svg>
          </div>
          <span class="count">${video.likes}</span>
        </button>
        <button class="action-button" data-action="comment">
          <div class="icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-chat-dots-fill" viewBox="0 0 16 16">
              <path d="M16 8c0 3.866-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7M5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
            </svg>
          </div>
          <span class="count">${video.comments}</span>
        </button>
        <button class="action-button ${bookmarkedClass}" data-action="bookmark">
          <div class="icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-bookmark-fill" viewBox="0 0 16 16">
              <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2"/>
            </svg>
          </div>
          <span class="count">${video.bookmarks}</span>
        </button>
        <button class="action-button" data-action="share">
          <div class="icon-container">
            <svg height="39px" viewBox="0 0 512 512" width="39px" xmlns="http://www.w3.org/2000/svg">
              <path d="M58.79,439.13A16,16,0 0 1,48 424c0-73.1,14.68-131.56,43.65-173.77,35-51,90.21-78.46,164.35-81.87V88a16,16 0 0 1,27.05-11.57l176 168a16,16 0 0 1,0 23.14l-176 168A16,16 0 0 1,256 424V344.23c-45,1.36-79,8.65-106.07,22.64-29.25,15.12-50.46,37.71-73.32,67a16,16 0 0 1-17.82,5.28Z" fill="white"/>
            </svg>
          </div>
          <span class="count">${video.shares}</span>
        </button>
      </div>
    `;

    return container;
  }

  createSubscriptionAd() {
    const container = document.createElement('div');
    container.className = 'video-container subscription-ad';

    container.innerHTML = `
      <div class="subscription-content">
        <div class="profile-wrapper">
          <div class="profile-image">
            <img src="./img/logo.PNG" alt="Profile">
            <div class="VIP-badge">VIP</div>
          </div>
        </div>
        <h2 class="profile-name">Fylo</h2>
        <p class="subscription-text">Inscreva-se para continuar assistindo<br>e aproveite as vantagens do Fylo</p>
        <a href="link" target="_blank" class="subscription-button">Inscreva-se</a>
      </div>
    `;

    return container;
  }

  renderVideos() {
    this.feed.innerHTML = '';
    const sharedVideoId = getVideoIdFromUrl();

    videos.forEach((video) => {
      const isShared = sharedVideoId === video.id;
      const videoElement = this.createVideoElement(video, isShared);
      this.feed.appendChild(videoElement);

      const player = new VideoPlayer(videoElement);
      this.players.push(player);
    });

    const subscriptionAd = this.createSubscriptionAd();
    this.feed.appendChild(subscriptionAd);

    if (sharedVideoId) {
      const firstVideo = this.feed.querySelector('.video-container');
      if (firstVideo) {
        firstVideo.scrollIntoView({ behavior: 'auto' });
      }
    }
  }

  initializeObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const player = this.players.find(p => p.container === entry.target);
          if (player) {
            if (entry.isIntersecting) {
              player.play();
            } else {
              player.pause();
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    this.players.forEach(player => {
      observer.observe(player.container);
    });
  }

  handleAction(action, button, video, isDoubleClick = false) {
    const count = button.querySelector('.count');

    switch (action) {
      case 'like':
        if (!isDoubleClick) {
          const wasLiked = this.storageState.likedVideos[video.id] === true;
          this.storageState.likedVideos[video.id] = !wasLiked;
          saveToStorage('likedVideos', this.storageState.likedVideos);

          if (!wasLiked) {
            button.classList.add('liked');
            const currentLikes = parseValue(video.likes);
            if (currentLikes < 1000) {
              video.likes = formatValue(currentLikes + 1);
              count.textContent = video.likes;
            }
          } else {
            button.classList.remove('liked');
            const currentLikes = parseValue(video.likes);
            if (currentLikes < 1000) {
              video.likes = formatValue(currentLikes - 1);
              count.textContent = video.likes;
            }
          }
        } else {
          if (!this.storageState.likedVideos[video.id]) {
            this.storageState.likedVideos[video.id] = true;
            saveToStorage('likedVideos', this.storageState.likedVideos);
            button.classList.add('liked');
            const currentLikes = parseValue(video.likes);
            if (currentLikes < 1000) {
              video.likes = formatValue(currentLikes + 1);
              count.textContent = video.likes;
            }
          }
        }
        break;

      case 'bookmark':
        const wasBookmarked = this.storageState.bookmarkedVideos[video.id] === true;
        this.storageState.bookmarkedVideos[video.id] = !wasBookmarked;
        saveToStorage('bookmarkedVideos', this.storageState.bookmarkedVideos);

        if (!wasBookmarked) {
          button.classList.add('bookmarked');
          const currentBookmarks = parseValue(video.bookmarks);
          if (currentBookmarks < 1000) {
            video.bookmarks = formatValue(currentBookmarks + 1);
            count.textContent = video.bookmarks;
          }
        } else {
          button.classList.remove('bookmarked');
          const currentBookmarks = parseValue(video.bookmarks);
          if (currentBookmarks < 1000) {
            video.bookmarks = formatValue(currentBookmarks - 1);
            count.textContent = video.bookmarks;
          }
        }
        break;

      case 'share':
        const shareMenu = new ShareMenu(video);
        shareMenu.show();
        break;

      case 'comment':
        const commentModal = new CommentModal(video);
        commentModal.show();
        break;
    }
  }

  handleDoubleTap(event) {
    const video = event.target.closest('video');
    if (!video) return;

    const currentTime = Date.now();
    const tapLength = currentTime - this.lastTap;

    if (tapLength < 300 && tapLength > 0) {
      const container = video.closest('.video-container');
      const likeButton = container.querySelector('[data-action="like"]');
      const videoIndex = Array.from(container.parentNode.children).indexOf(container);
      const videoData = videos[videoIndex];

      if (likeButton) {
        this.handleAction('like', likeButton, videoData, true);
      }

      const touchX = event.changedTouches[0].clientX;
      const touchY = event.changedTouches[0].clientY;

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

      event.preventDefault();
    }

    this.lastTap = currentTime;
  }

  initializeEvents() {

    document.addEventListener('click', (e) => {
      const video = e.target.closest('video');
      const actionButton = e.target.closest('.action-button');

      if (video) {
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
      }

      if (actionButton) {
        const action = actionButton.dataset.action;
        const container = actionButton.closest('.video-container');
        const videoIndex = Array.from(container.parentNode.children).indexOf(container);
        const video = videos[videoIndex];
        this.handleAction(action, actionButton, video);
      }
    });

    document.addEventListener('touchstart', (e) => this.handleDoubleTap(e));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new VideoFeed();
});