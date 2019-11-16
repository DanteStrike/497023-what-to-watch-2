import types from "./types.js";
import utils from "./utils.js";

const setupFilterState = (filmsGenres) => {
  return {
    type: types.SETUP_FILTER_STATE,
    payload: utils.collectState(filmsGenres)
  };
};

const setCurrentFilter = (genre) => {
  return {
    type: types.SET_CURRENT_FILTER,
    payload: genre
  };
};

export default {
  setupFilterState,
  setCurrentFilter
};

