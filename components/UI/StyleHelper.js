export function getPlayerStyle(device) {
  if (device == 1) {
    return {
      height: 205,
      width: 365,
    };
  } else if (device == 3) {
    return {
      width: 1280,
      height: 720,
    };
  }
}
