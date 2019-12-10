import types from "./types.js";
import {combineReducers} from "redux";


const appReadyReducer = (state = false, action) => {
  if (action.type === types.SET_APP_IS_READY) {
    return action.payload;
  }

  return state;
};

const setupAppInitState = {
  isError: false,
  code: null,
  msg: ``
};
const setupAppReducer = (state = setupAppInitState, action) => {
  switch (action.type) {
    case types.INIT_SETUP_APP_ERROR:
      return {
        isError: true,
        code: action.payload.code,
        msg: action.payload.msg,
      };
    case types.RESET_SETUP_APP_ERROR:
      return setupAppInitState;
    default:
      return state;
  }
};

const videoPlayerReducer = (state = -1, action) => {
  switch (action.type) {
    case types.OPEN_VIDEO_PLAYER:
      return action.payload;
    case types.CLOSE_VIDEO_PLAYER:
      return -1;
    default:
      return state;
  }
};

const reducer = combineReducers({
  isReady: appReadyReducer,
  setupAppError: setupAppReducer,
  videoPlayerFilmID: videoPlayerReducer
});


export default reducer;
