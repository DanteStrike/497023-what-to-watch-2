import types from "./types.js";
import {combineReducers} from "redux";

const loadReducer = (state = {}, action) => {
  if (action.type === types.LOAD_FILMS) {
    return action.payload;
  }

  return state;
};

const reducer = combineReducers({
  data: loadReducer
});

export default reducer;
