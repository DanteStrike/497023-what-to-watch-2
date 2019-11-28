import types from "./types.js";
import {combineReducers} from "redux";


const appReadyReducer = (state = false, action) => {
  if (action.type === types.SET_APP_IS_READY) {
    return action.payload;
  }

  return state;
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
  videoPlayerFilmID: videoPlayerReducer
});


export default reducer;
