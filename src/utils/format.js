export function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function parseValue(value) {
  if (value.includes('K')) {
    return parseFloat(value.replace('K', '')) * 1000;
  } else if (value.includes('M')) {
    return parseFloat(value.replace('M', '')) * 1000000;
  }
  return parseInt(value.replace(/[^0-9]/g, ''));
}

export function formatValue(value) {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + 'M';
  } else if (value >= 1000) {
    return (value / 1000).toFixed(1) + 'K';
  }
  return value.toString();
}