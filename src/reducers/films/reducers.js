import types from "./types.js";
import {combineReducers} from "redux";

const filmsReducer = (state = {}, action) => {
  if (action.type === types.LOAD_FILMS) {
    return action.payload;
  }

  return state;
};

const reducer = combineReducers({
  data: filmsReducer
});

export default reducer;
