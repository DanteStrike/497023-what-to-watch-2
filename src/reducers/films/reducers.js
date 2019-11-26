import types from "./types.js";
import {combineReducers} from "redux";
import {updateObject} from "../../utils/object/object.js";

const initDataState = {
  byIDs: {},
  allIDs: []
};

const loadFilmReducer = (state = initDataState, action) => {
  if (action.type === types.LOAD_FILMS) {
    return action.payload;
  }

  return state;
};

const initPromoState = {
  filmID: null
};

const loadPromoReducer = (state = initPromoState, action) => {
  if (action.type === types.LOAD_PROMO) {
    return updateObject(state, {filmID: action.payload});
  }

  return state;
};

const reducer = combineReducers({
  data: loadFilmReducer,
  promo: loadPromoReducer
});

export default reducer;
