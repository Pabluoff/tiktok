import { formatTime } from '../utils/format.js';

export class VideoPlayer {
  constructor(container) {
    this.container = container;
    this.video = container.querySelector('video');
    this.progressBar = container.querySelector('.progress-bar');
    this.progressDot = container.querySelector('.progress-dot');
    this.timeDisplay = container.querySelector('.time-display');
    this.isInteracting = false;
    
    this.initializeEvents();
  }

  initializeEvents() {
    this.video.addEventListener('loadedmetadata', () => {
      this.updateTotalTime();
    });

    this.video.addEventListener('timeupdate', () => {
      this.updateProgress();
    });
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

  updateTotalTime() {
    const totalTimeSpan = this.timeDisplay.querySelector('.total-time');
    if (totalTimeSpan) {
      totalTimeSpan.textContent = formatTime(this.video.duration);
    }
  }

  play() {
    this.video.play();
  }

  pause() {
    this.video.pause();
  }
}