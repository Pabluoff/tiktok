export function loadStorageState() {
  const defaultState = {
    likedVideos: {},
    bookmarkedVideos: {}
  };

  try {
    const savedLikes = localStorage.getItem('likedVideos');
    const savedBookmarks = localStorage.getItem('bookmarkedVideos');

    if (savedLikes) {
      defaultState.likedVideos = JSON.parse(savedLikes);
    }
    if (savedBookmarks) {
      defaultState.bookmarkedVideos = JSON.parse(savedBookmarks);
    }
  } catch (error) {
    console.error('Error loading saved data:', error);
  }

  return defaultState;
}

export function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}