import {createSelector} from "reselect";
import {genreFilterSelectors} from "../genre-filter/index.js";
import {movieListSelectors} from "../movie-list/index.js";
import StoreNameSpace from "../store-name-space";


const getStoreSpace = (store) => store[StoreNameSpace.FILMS];
const getAllIDs = (store) => getStoreSpace(store).data.allIDs;
const getFilmsByIDs = (store) => getStoreSpace(store).data.byIDs;
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

const getFilmByCurrentID = (store, id) => getFilmsByIDs(store)[id];

export default {
  getStoreSpace,
  getAllIDs,
  getFilmsByIDs,
  getFilmsAmount,
  getAllFilmsGenres,
  getCurrentCardsInfo,
  getFilmByCurrentID
};
