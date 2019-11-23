import types from "./types";
import {combineReducers} from "redux";


const displayedFilmsAmountReducer = (state = 0, action) => {
  switch (action.type) {
    case types.SHOW_MORE_FILMS:
      return state + action.payload;

    case types.SET_DISPLAYED_FILMS_AMOUNT:
      return action.payload;

    default:
      return state;
  }
};


const reducer = combineReducers({
  displayedFilmsAmount: displayedFilmsAmountReducer
});

export default reducer;

