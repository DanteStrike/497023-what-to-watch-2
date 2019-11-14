import types from "./types.js";


const loadFilms = (films) => {
  return {
    type: types.LOAD_FILMS,
    payload: films
  };
};


export default {
  loadFilms
};
