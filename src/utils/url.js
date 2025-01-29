export function generateRandomString(length = 6) {
  return Math.random().toString(36).substring(2, 2 + length);
}

export function getVideoIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('v');
}

export function generateShareUrl(videoId) {
  const randomString = generateRandomString();
  return `${window.location.origin}${window.location.pathname}?${randomString}&v=${videoId}`;
}