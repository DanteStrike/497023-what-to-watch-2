import types from "./types.js";

const setAppIsReady = (isAppReady) => ({
  type: types.SET_APP_IS_READY,
  payload: isAppReady
});

export default {
  setAppIsReady
};

