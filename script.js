const videos = [
    {
        url: 'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-1232-large.mp4',
        username: 'DGSOficial',
        description: 'Rasparia teu cabelo por 50mil reais em dinheiro? 💰 😅 #dinheiro #hum... mais',
        music: 'som original - dgs.oficiall',
        likes: '167,5 mil',
        comments: '14,8 mil',
        bookmarks: '4.165',
        shares: '14,2 mil',
        userProfile: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=64&h=64&fit=crop'
    },
    {
        url: 'https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4',
        username: '@nature_vibes',
        description: '🌸 Spring is here! #nature #beautiful',
        music: 'som original - nature.vibes',
        likes: '223,4 mil',
        comments: '18,2 mil',
        bookmarks: '5.234',
        shares: '20,1 mil',
        userProfile: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop'
    },
];

function createVideoElement(video) {
    const container = document.createElement('div');
    container.className = 'video-container';
    
    container.innerHTML = `
        <video src="${video.url}" loop muted playsinline></video>
        <div class="video-info">
            <div class="username">${video.username}</div>
            <div class="description">${video.description}</div>
            <div class="music">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
                ${video.music}
            </div>
        </div>
        <div class="video-actions">
            <div class="user-profile">
                <img src="${video.userProfile}" alt="Profile">
            </div>
            <div class="action-button">
                <div class="icon-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                </div>
                <span class="count">${video.likes}</span>
            </div>
            <div class="action-button">
                <div class="icon-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                </div>
                <span class="count">${video.comments}</span>
            </div>
            <div class="action-button">
                <div class="icon-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
                </div>
                <span class="count">${video.bookmarks}</span>
            </div>
            <div class="action-button">
                <div class="icon-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/></svg>
                </div>
                <span class="count">${video.shares}</span>
            </div>
        </div>
    `;

    return container;
}

function initializeFeed() {
    const feed = document.getElementById('feed');
    videos.forEach(video => {
        feed.appendChild(createVideoElement(video));
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                const video = entry.target.querySelector('video');
                if (entry.isIntersecting) {
                    video.play();
                } else {
                    video.pause();
                }
            });
        },
        { threshold: 0.6 }
    );

    document.querySelectorAll('.video-container').forEach(container => {
        observer.observe(container);
    });
}

document.addEventListener('DOMContentLoaded', initializeFeed);

document.addEventListener('click', (e) => {
    const video = e.target.closest('video');
    if (video) {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }
});