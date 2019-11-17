import types from "./types.js";
import utils from "./utils.js";


const loadFilms = (filmsRAW) => {
  return {
    type: types.LOAD_FILMS,
    payload: utils.transformFilmsRAW(filmsRAW)
  };
};


export default {
  loadFilms
};
