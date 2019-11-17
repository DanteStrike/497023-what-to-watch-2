import types from "./types.js";
import {combineReducers} from "redux";


const appReadyReducer = (state = false, action) => {
  if (action.type === types.SET_APP_IS_READY) {
    return action.payload;
  }

  return state;
};

const reducer = combineReducers({
  isReady: appReadyReducer
});


export default reducer;
