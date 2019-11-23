import {createSelector} from "reselect";
import {genreFilterSelectors} from "../genres/index.js";
import {catalogSelectors} from "../catalog/index.js";
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
    (currentFilterIDs, films) => currentFilterIDs.map((filmID) => ({
      id: films[filmID].id,
      name: films[filmID].name,
      preview: films[filmID].preview,
    }))
);

const getDisplayedCardInfo = createSelector(
    getCurrentCardsInfo,
    catalogSelectors.getDisplayedFilmsAmount,
    (currentCards, amount) => currentCards.slice(0, amount)
);

const getFilmByCurrentID = (store, id) => getFilmsByIDs(store)[id];
const getLikeThisCardsInfo = (store, id) => getCurrentCardsInfo(store)
  .filter((card) => card.id !== id)
  .slice(0, catalogSelectors.getDisplayedFilmsAmount(store));

export default {
  getStoreSpace,
  getAllIDs,
  getFilmsByIDs,
  getFilmsAmount,
  getAllFilmsGenres,
  getCurrentCardsInfo,
  getDisplayedCardInfo,
  getLikeThisCardsInfo,
  getFilmByCurrentID
};
