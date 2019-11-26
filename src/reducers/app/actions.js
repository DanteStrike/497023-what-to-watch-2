import types from "./types.js";

const setAppIsReady = (isAppReady) => ({
  type: types.SET_APP_IS_READY,
  payload: isAppReady
});

const openVideoPlayer = (filmID) => ({
  type: types.OPEN_VIDEO_PLAYER,
  payload: filmID
});

const closeVideoPlayer = () => ({
  type: types.CLOSE_VIDEO_PLAYER
});

export default {
  setAppIsReady,
  openVideoPlayer,
  closeVideoPlayer
};

