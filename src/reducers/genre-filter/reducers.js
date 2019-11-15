import types from "./types.js";
import utils from "./utils.js";
import {combineReducers} from "redux";

const initSetupState = {
  genres: [utils.ALL_GENRE],
  byGenres: {
    [utils.ALL_GENRE]: []
  }
};

const setupReducer = (state = initSetupState, action) => {
  if (action.type === types.SETUP_FILTER_STATE) {
    return action.payload;
  }

  return state;
};

const filterReducer = (state = utils.ALL_GENRE, action) => {
  if (action.type === types.SET_CURRENT_FILTER) {
    return action.payload;
  }

  return state;
};

const reducer = combineReducers({
  currentFilter: filterReducer,
  data: setupReducer
});

export default reducer;
