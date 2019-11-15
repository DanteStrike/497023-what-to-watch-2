import types from "./types.js";
import filmsSelectors from "../films/selectors.js";
import utils from "./utils.js";

const setupFilterState = () => {
  const filmsGenres = filmsSelectors.getAllFilmsGenres();

  return {
    type: types,
    payload: utils.collectState(filmsGenres)
  };
};

export default {
  setupFilterState
};

