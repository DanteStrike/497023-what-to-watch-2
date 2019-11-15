import types from "./types.js";
import {filmsSelectors} from "../films/index.js";
import utils from "./utils.js";

const setupFilterState = () => {
  const filmsGenres = filmsSelectors.getAllFilmsGenres();

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

