if (!sessionStorage.getItem('pageLoaded')) {
  sessionStorage.setItem('pageLoaded', 'true');
} else {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.delete('v');

  window.history.replaceState(null, '', window.location.pathname + '?' + urlParams.toString());

  sessionStorage.removeItem('pageLoaded');
}

function getVideoIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('v');
}

function reorderVideos(videos, sharedVideoId) {
  if (!sharedVideoId) return videos;

  const videosCopy = [...videos];
  const sharedVideoIndex = videosCopy.findIndex(v => v.id === sharedVideoId);

  if (sharedVideoIndex !== -1) {
    const [sharedVideo] = videosCopy.splice(sharedVideoIndex, 1);
    videosCopy.unshift(sharedVideo);
  }

  return videosCopy;
}


const videos = [{
  id: '1',
  url: './img/modelo2.MP4',
  username: 'Michelly Cardoso',
  description: 'Será que desse ângulo fica bom? 🤭',
  hashtags: '#Fyp #Viral #Trendy',
  music: 'som original - Michelly Cardoso',
  likes: '16.5K',
  comments: '1.8K',
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
  music: 'som original - Sarah Beaulty',
  likes: '23.4K',
  comments: '8.2K',
  bookmarks: '5.2K',
  shares: '20.1K',
  userProfile: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop'
},
{
  id: '3',
  url: './img/modelo2.MP4',
  username: 'Michelly Cardoso',
  description: 'Será que desse ângulo fica bom? 🤭',
  hashtags: '#Fyp #Viral #Trendy',
  music: 'som original - Michelly Cardoso',
  likes: '16.5K',
  comments: '1.8K',
  bookmarks: '4.1K',
  shares: '14.2K',
  userProfile: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=64&h=64&fit=crop'
}
];

const videoIdFromUrl = getVideoIdFromUrl();
if (videoIdFromUrl) {
  highlightVideoById(videoIdFromUrl, videos);
}

let likedVideos = {};
let bookmarkedVideos = {};

try {
  const savedLikes = localStorage.getItem('likedVideos');
  const savedBookmarks = localStorage.getItem('bookmarkedVideos');

  if (savedLikes) {
    likedVideos = JSON.parse(savedLikes);
  }
  if (savedBookmarks) {
    bookmarkedVideos = JSON.parse(savedBookmarks);
  }
} catch (error) {
  console.error('Error loading saved data:', error);
}

function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function createVideoElement(video, isShared = false) {
  const container = document.createElement('div');
  container.className = 'video-container';

  const isLiked = likedVideos[video.id] === true;
  const isBookmarked = bookmarkedVideos[video.id] === true;
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
  <div class="time-display">0:00 / 0:00</div>
  <div class="sub-progress-bar">
    <div class="progress-bar">
      <div class="progress-dot"></div>
    </div>
  </div>
  <div class="video-info">
    <div class="username">
      ${video.username}
    </div>
    <div class="description">${video.description}</div>
    <div class="hashtags">${video.hashtags}</div>
    <div class="music">
        <div class="music">
            <svg class="music-icon" xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor"
                class="bi bi-music-note-beamed" viewBox="0 0 16 16">
                <path
                    d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13s1.12-2 2.5-2 2.5.896 2.5 2m9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2" />
                <path fill-rule="evenodd" d="M14 11V2h1v9zM6 3v10H5V3z" />
                <path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4z" />
            </svg> 
          ${video.music}
    </div>
  </div>
  <div class="video-actions">
           <button class="follow-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
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
        <svg xmlns="http://www.w3.org/2000/svg" width="32"height="32" fill="currentColor" class="bi bi-bookmark-fill" viewBox="0 0 16 16">
          <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2"/>
<         /svg>
      </div>
      <span class="count">${video.bookmarks}</span>
    </button>
    <button class="action-button" data-action="share">
      <div class="icon-container">
        <svg height="39px" viewBox="0 0 512 512" width="39px" xmlns="http://www.w3.org/2000/svg"><title/>
          <path d="M58.79,439.13A16,16,0,0,1,48,424c0-73.1,14.68-131.56,43.65-173.77,35-51,90.21-78.46,164.35-81.87V88a16,16,0,0,1,27.05-11.57l176,168a16,16,0,0,1,0,23.14l-176,168A16,16,0,0,1,256,424V344.23c-45,1.36-79,8.65-106.07,22.64-29.25,15.12-50.46,37.71-73.32,67a16,16,0,0,1-17.82,5.28Z" fill="white"/>
         </svg>
      </div>
      <span class="count">${video.shares}</span>
    </button>
  </div>
`;

  return container;
}

function createSubscriptionAd() {
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

function initializeFeed() {
  const sharedVideoId = getVideoIdFromUrl();
  const reorderedVideos = reorderVideos(videos, sharedVideoId);
  const feed = document.getElementById('feed');
  let isInteracting = false;

  feed.innerHTML = '';

  reorderedVideos.forEach((video) => {
    const isShared = sharedVideoId === video.id;
    const videoElement = createVideoElement(video, isShared);
    feed.appendChild(videoElement);

    const videoTag = videoElement.querySelector('video');
    const subProgressBar = videoElement.querySelector('.sub-progress-bar');
    const progressBar = videoElement.querySelector('.progress-bar');
    const progressDot = videoElement.querySelector('.progress-dot');
    const timeDisplay = videoElement.querySelector('.time-display');
    const videoInfo = videoElement.querySelector('.video-info');
    const videoActions = videoElement.querySelector('.video-actions');

    const currentTimeSpan = document.createElement('span');
    currentTimeSpan.classList.add('current-time');
    const totalTimeSpan = document.createElement('span');
    totalTimeSpan.classList.add('total-time');
    timeDisplay.innerHTML = '';
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

      document.querySelectorAll('.video-info').forEach(info => info.classList.add('hidden'));
      document.querySelectorAll('.video-actions').forEach(actions => actions.classList.add('hidden'));
      document.querySelectorAll('.time-display').forEach(timer => timer.classList.add('visible'));
      document.querySelectorAll('.shared-badge-container').forEach(badge => badge.classList.add('hidden'));

      updateProgress(event);
      feed.style.overflowY = 'hidden';
    };

    const stopInteraction = () => {
      if (isInteracting) {
        isInteracting = false;
        subProgressBar.classList.remove('interacting');

        document.querySelectorAll('.video-info').forEach(info => info.classList.remove('hidden'));
        document.querySelectorAll('.video-actions').forEach(actions => actions.classList.remove('hidden'));
        document.querySelectorAll('.time-display').forEach(timer => timer.classList.remove('visible'));
        document.querySelectorAll('.shared-badge-container').forEach(badge => badge.classList.remove('hidden'));

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

  // Adiciona o anúncio de inscrição após os vídeos
  const subscriptionAd = createSubscriptionAd();
  feed.appendChild(subscriptionAd);

  // Ajustar opacidade ao rolar
  feed.addEventListener('scroll', () => {
    if (!isInteracting) {
      document.querySelectorAll('.sub-progress-bar').forEach((bar) => {
        bar.style.opacity = '0';
      });

      clearTimeout(feed.scrollTimeout);

      feed.scrollTimeout = setTimeout(() => {
        document.querySelectorAll('.sub-progress-bar').forEach((bar) => {
          bar.style.opacity = '1';
        });
      }, 300);
    }
  });

  if (sharedVideoId) {
    const firstVideo = feed.querySelector('.video-container');
    if (firstVideo) {
      firstVideo.scrollIntoView({
        behavior: 'auto'
      });
    }
  }

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
    }, {
    threshold: 0.5
  }
  );

  document.querySelectorAll('.video-container').forEach((container) => {
    observer.observe(container);
  });

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
      handleAction(action, actionButton);
    }

  });
}

function parseValue(value) {
  if (value.includes('K')) {
    return parseFloat(value.replace('K', '')) * 1000;
  } else if (value.includes('M')) {
    return parseFloat(value.replace('M', '')) * 1000000;
  }
  return parseInt(value.replace(/[^0-9]/g, ''));
}

function formatValue(value) {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + 'M';
  } else if (value >= 1000) {
    return (value / 1000).toFixed(1) + 'K';
  }
  return value.toString();
}

function handleAction(action, button, isDoubleClick = false) {
  const count = button.querySelector('.count');
  const videoContainer = button.closest('.video-container');
  const videoIndex = Array.from(videoContainer.parentNode.children).indexOf(videoContainer);
  const video = videos[videoIndex];

  switch (action) {
    case 'like':
      if (!isDoubleClick) {
        const wasLiked = likedVideos[video.id] === true;
        likedVideos[video.id] = !wasLiked;
        localStorage.setItem('likedVideos', JSON.stringify(likedVideos));

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
        if (!likedVideos[video.id]) {
          likedVideos[video.id] = true;
          localStorage.setItem('likedVideos', JSON.stringify(likedVideos));
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
      const wasBookmarked = bookmarkedVideos[video.id] === true;
      bookmarkedVideos[video.id] = !wasBookmarked;
      localStorage.setItem('bookmarkedVideos', JSON.stringify(bookmarkedVideos));

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
      <h3>Exclusivo para VIPs</h3>
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


function getVideoIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('v');
}

function generateRandomString(length = 6) {
  return Math.random().toString(36).substring(2, 2 + length);
}

function generateShareUrl(videoId) {
  const randomString = generateRandomString();
  return `${window.location.origin}${window.location.pathname}?${randomString}&v=${videoId}`;
}

function highlightVideoById(videoId, videos) {
  const videoIndex = videos.findIndex(video => video.id === videoId);
  if (videoIndex !== -1) {
    const [highlightedVideo] = videos.splice(videoIndex, 1);
    videos.unshift(highlightedVideo);
  }
}

function handleShare(video) {
  const shareMenu = document.createElement('div');
  shareMenu.className = 'share-menu';

  const shareOverlay = document.createElement('div');
  shareOverlay.className = 'share-overlay';

  const urlVideoId = getVideoIdFromUrl();
  const videoIdToShare = (urlVideoId && video.id === videos[0].id) ? urlVideoId : video.id;
  const videoUrl = generateShareUrl(videoIdToShare);

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
  function getRandomShareText(videoUsername) {
    const texts = [
      `👀 Olha o vídeo de ${videoUsername}`,
      `Olha ${videoUsername} nesse vídeo 😳`,
      `Nossa.... ${videoUsername}, tem um talento incrível🔥 `,
      `O que ${videoUsername} fez nesse vídeo? Você não vai acreditar...`,
      `Sabe aquele vídeo que te deixa com vontade de ver mais? É esse de ${videoUsername}!`,
      `Se você acha que já viu tudo, espere até ver esse vídeo de ${videoUsername}!`
    ];

    const randomIndex = Math.floor(Math.random() * texts.length);
    return encodeURIComponent(texts[randomIndex]);
  }

  const text = getRandomShareText(video.username);
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

// Double tap para curtir
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

document.addEventListener('DOMContentLoaded', initializeFeed);