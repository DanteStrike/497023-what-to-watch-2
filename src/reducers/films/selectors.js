import {createSelector} from "reselect";
import {genreFilterSelectors} from "../genre-filter/index.js";
import {movieListSelectors} from "../movie-list/index.js";

const getAllIDs = (store) => store.films.data.allIDs;
const getFilmsByIDs = (store) => store.films.data.byIDs;
const getFilmsAmount = (store) => getAllIDs(store).length;

const getAllFilmsGenres = createSelector(
    getAllIDs,
    getFilmsByIDs,
    (allIDs, films) => allIDs.map((filmID) => ({
      id: films[filmID].id,
      genre: films[filmID].genre
    }))
);

const getCurrentCardsInfo = createSelector(
    genreFilterSelectors.getCurrentFilterFilmsIDs,
    getFilmsByIDs,
    movieListSelectors.getDisplayedFilmsAmount,
    (currentFilterIDs, films, amount) => currentFilterIDs.map((filmID) => ({
      id: films[filmID].id,
      name: films[filmID].name,
      preview: films[filmID].preview,
    })).slice(0, amount)
);

export default {
  getAllIDs,
  getFilmsByIDs,
  getFilmsAmount,
  getAllFilmsGenres,
  getCurrentCardsInfo
};
