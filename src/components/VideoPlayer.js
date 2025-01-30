import { formatTime } from '../utils/format.js';

export class VideoPlayer {
  constructor(container) {
    this.container = container;
    this.video = container.querySelector('video');
    this.progressBar = container.querySelector('.progress-bar');
    this.progressDot = container.querySelector('.progress-dot');
    this.timeDisplay = container.querySelector('.time-display');
    this.subProgressBar = container.querySelector('.sub-progress-bar');
    this.videoInfo = container.querySelector('.video-info');
    this.videoActions = container.querySelector('.video-actions');
    this.isInteracting = false;
    this.opacityTimeout = null;
    this.longPressTimeout = null;
    this.isPlaying = false;

    this.setupPlayPauseButton();
    this.initializeEvents();
  }

  setupPlayPauseButton() {
    this.playPauseButton = document.createElement('button');
    this.playPauseButton.className = 'play-pause-button';
    this.updatePlayPauseIcon();
    this.container.appendChild(this.playPauseButton);
  }

  updatePlayPauseIcon() {
    this.playPauseButton.innerHTML = this.isPlaying
      ? ``
      : `<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" fill="white" stroke-linejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
         </svg>`;
  }

  initializeEvents() {
    this.video.addEventListener('loadedmetadata', () => this.updateTotalTime());
    this.video.addEventListener('timeupdate', () => this.updateProgress());
    this.video.addEventListener('play', () => {
      this.isPlaying = true;
      this.updatePlayPauseIcon();
    });
    this.video.addEventListener('pause', () => {
      this.isPlaying = false;
      this.updatePlayPauseIcon();
    });

    // Controle de clique único e duplo
    let clickTimeout = null;
    const doubleClickDelay = 300;

    const handleClick = () => {
      if (clickTimeout) {
        clearTimeout(clickTimeout);
        clickTimeout = null;
        return; // Se houver um segundo clique rápido, ignora a ação
      }

      clickTimeout = setTimeout(() => {
        this.togglePlayPause();
        clickTimeout = null;
      }, doubleClickDelay);
    };

    this.video.addEventListener('click', handleClick);
    this.playPauseButton.addEventListener('click', handleClick);

    if (this.subProgressBar) {
      this.subProgressBar.addEventListener('mousedown', (event) => this.startInteraction(event));
      this.subProgressBar.addEventListener('mousemove', (event) => this.updateProgressInteraction(event));
      document.addEventListener('mouseup', () => this.stopInteraction());

      this.subProgressBar.addEventListener('touchstart', (event) => this.startInteraction(event));
      this.subProgressBar.addEventListener('touchmove', (event) => this.updateProgressInteraction(event));
      document.addEventListener('touchend', () => this.stopInteraction());
    }

    this.container.addEventListener('scroll', () => {
      this.adjustOpacity(true, true);
      clearTimeout(this.opacityTimeout);
      this.opacityTimeout = setTimeout(() => this.adjustOpacity(false, false), 500);
    });

    this.container.addEventListener('touchstart', (event) => {
      if (!event.target.closest('.sub-progress-bar')) {
        this.longPressTimeout = setTimeout(() => {
          this.adjustOpacity(true, false);
        }, 600);
      }
    });

    this.container.addEventListener('touchend', () => {
      clearTimeout(this.longPressTimeout);
      this.adjustOpacity(false, false);
    });
  }

  togglePlayPause() {
    this.isPlaying ? this.pause() : this.play();
  }

  adjustOpacity(reduce = true, instant = false) {
    const opacityValue = reduce ? 0 : 1;
    const transitionStyle = instant ? 'none' : 'opacity 0.3s ease';

    if (this.subProgressBar) {
      this.subProgressBar.style.transition = transitionStyle;
      this.subProgressBar.style.opacity = opacityValue;
    }

    if (this.videoInfo && this.videoActions) {
      const infoOpacity = reduce ? 0.5 : 1;
      this.videoInfo.style.transition = transitionStyle;
      this.videoActions.style.transition = transitionStyle;
      this.videoInfo.style.opacity = infoOpacity;
      this.videoActions.style.opacity = infoOpacity;
    }
  }

  updateTotalTime() {
    const totalTimeSpan = this.timeDisplay.querySelector('.total-time');
    if (totalTimeSpan) {
      totalTimeSpan.textContent = formatTime(this.video.duration);
    }
  }

  updateProgress() {
    if (!this.isInteracting) {
      const percentage = (this.video.currentTime / this.video.duration) * 100;
      this.progressBar.style.width = `${percentage}%`;
      this.progressDot.style.transform = `translate(${percentage}%, -50%)`;
      this.updateCurrentTime();
    }
  }

  updateCurrentTime() {
    const currentTimeSpan = this.timeDisplay.querySelector('.current-time');
    if (currentTimeSpan) {
      currentTimeSpan.textContent = formatTime(this.video.currentTime);
    }
  }

  startInteraction(event) {
    this.isInteracting = true;
    this.video.pause();
    this.subProgressBar.classList.add('interacting');
    this.container.querySelectorAll('.video-info, .video-actions, .shared-badge-container').forEach(el => el.classList.add('hidden'));
    this.container.querySelector('.time-display').classList.add('visible');
    this.updateProgressInteraction(event);
  }

  stopInteraction() {
    if (this.isInteracting) {
      this.isInteracting = false;
      this.video.play();
      this.subProgressBar.classList.remove('interacting');
      this.container.querySelectorAll('.video-info, .video-actions, .shared-badge-container').forEach(el => el.classList.remove('hidden'));
      this.container.querySelector('.time-display').classList.remove('visible');
    }
  }

  updateProgressInteraction(event) {
    if (!this.isInteracting) return;

    const rect = this.subProgressBar.getBoundingClientRect();
    const offsetX = event.touches ? event.touches[0].clientX : event.clientX;
    const percentage = Math.max(0, Math.min(1, (offsetX - rect.left) / rect.width));

    this.video.currentTime = percentage * this.video.duration;
    this.updateCurrentTime();
    this.progressBar.style.width = `${percentage * 100}%`;
    this.progressDot.style.transform = `translate(${percentage * 100}%, -50%)`;
  }

  play() {
    this.video.play();
    this.isPlaying = true;
    this.updatePlayPauseIcon();
  }

  pause() {
    this.video.pause();
    this.isPlaying = false;
    this.updatePlayPauseIcon();
  }
}
