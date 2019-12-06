import {createSelector} from "reselect";
import {genreFilterSelectors} from "../genres/index.js";
import {catalogSelectors} from "../catalog/index.js";
import StoreNameSpace from "../store-name-space";
import {userSelectors} from "../user";


const getStoreSpace = (store) => store[StoreNameSpace.FILMS];
const getAllIDs = (store) => getStoreSpace(store).data.allIDs;
const getFilmsByIDs = (store) => getStoreSpace(store).data.byIDs;
const getPromoID = (store) => getStoreSpace(store).promo.filmID;
const getPromoFilm = (store) => getFilmsByIDs(store)[getPromoID(store)];
const getFilmsAmount = (store) => getAllIDs(store).length;

const getCurFilmID = (_, {curFilmID}) => curFilmID;
const getFilmByCurID = (store, {curFilmID}) => getFilmsByIDs(store)[curFilmID];
const getCurFilmName = (store, {curFilmID}) => getFilmByCurID(store, {curFilmID}).name;
const getCurFilmGenre = (store, {curFilmID}) => getFilmByCurID(store, {curFilmID}).genre;
const getCurFilmReleased = (store, {curFilmID}) => getFilmByCurID(store, {curFilmID}).released;

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

const getFilmByCurrentID = createSelector(
    getFilmsByIDs,
    getCurFilmID,
    (films, id) => films[id]
);
const getLikeThisCardsInfo = createSelector(
    getCurrentCardsInfo,
    getCurFilmID,
    catalogSelectors.getDisplayedFilmsAmount,
    (currentCards, curFilmID, amount) => (amount === 0) ? [] : currentCards
      .filter((card) => card.id !== curFilmID)
      .slice(0, amount)
);

export default {
  getStoreSpace,
  getCurFilmID,
  getAllIDs,
  getFilmsByIDs,
  getFilmsAmount,
  getAllFilmsGenres,
  getCurrentCardsInfo,
  getDisplayedCardInfo,
  getLikeThisCardsInfo,
  getFilmByCurrentID,
  getFilmByCurID,
  getCurFilmName,
  getCurFilmGenre,
  getCurFilmReleased,
  getPromoID,
  getPromoFilm
};
