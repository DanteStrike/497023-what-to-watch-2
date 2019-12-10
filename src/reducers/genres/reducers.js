import types from "./types.js";
import {combineReducers} from "redux";
import Constants from "../../constants";

const initSetupState = {
  genres: [Constants.GenreFilter.ALL_GENRE],
  byGenres: {
    [Constants.GenreFilter.ALL_GENRE]: []
  }
};

const setupReducer = (state = initSetupState, action) => {
  if (action.type === types.SETUP_FILTER_STATE) {
    return action.payload;
  }

  return state;
};

const filterReducer = (state = Constants.GenreFilter.ALL_GENRE, action) => {
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
