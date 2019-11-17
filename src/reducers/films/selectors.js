import {createSelector} from "reselect";
import {genreFilterSelectors} from "../genre-filter/index.js";

const getAllIDs = (store) => store.films.data.allIDs;
const getFilmsByIDs = (store) => store.films.data.byIDs;

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
    (currentFilterIDs, films) => currentFilterIDs.map((filmID) => ({
      id: films[filmID].id,
      name: films[filmID].name,
      preview: films[filmID].preview,
    }))
);

export default {
  getAllIDs,
  getFilmsByIDs,
  getAllFilmsGenres,
  getCurrentCardsInfo
};
