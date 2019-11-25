import types from "./types.js";
import {combineReducers} from "redux";

const loadCommentsReducer = (state = [], action) => {
  if (action.type === types.LOAD_CUR_FILM_COMMENTS) {
    return action.payload;
  }

  return state;
};

const reducer = combineReducers({
  curFilmComments: loadCommentsReducer
});

export default reducer;
