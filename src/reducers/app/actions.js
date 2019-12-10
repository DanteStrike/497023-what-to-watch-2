import types from "./types.js";

const setAppIsReady = (isAppReady) => ({
  type: types.SET_APP_IS_READY,
  payload: isAppReady
});

const initSetupAppError = (code, msg) => ({
  type: types.INIT_SETUP_APP_ERROR,
  payload: {
    code,
    msg
  }
});

const resetSetupAppError = () => ({
  type: types.RESET_SETUP_APP_ERROR
});

const openVideoPlayer = (filmID) => ({
  type: types.OPEN_VIDEO_PLAYER,
  payload: filmID
});

const closeVideoPlayer = () => ({
  type: types.CLOSE_VIDEO_PLAYER
});

const identifyEdgeBrowser = () => {
  const isEdge = navigator.userAgent.indexOf(`Edge`) > -1;
  return {
    type: types.IDENTIFY_EDGE_BROWSER,
    payload: isEdge
  };
};

export default {
  setAppIsReady,
  openVideoPlayer,
  closeVideoPlayer,
  initSetupAppError,
  resetSetupAppError,
  identifyEdgeBrowser
};

