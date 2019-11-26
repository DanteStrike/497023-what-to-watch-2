import StoreNameSpace from "../store-name-space";


const getStoreSpace = (store) => store[StoreNameSpace.GENRES];
const getCurrentFilter = (store) => getStoreSpace(store).currentFilter;
const getGenres = (store) => getStoreSpace(store).data.genres;
const getCurrentFilterFilmsIDs = (store) => getStoreSpace(store).data.byGenres[getCurrentFilter(store)];
const getCurrentFilterFilmsAmount = (store) => getCurrentFilterFilmsIDs(store).length;


export default {
  getStoreSpace,
  getCurrentFilter,
  getGenres,
  getCurrentFilterFilmsIDs,
  getCurrentFilterFilmsAmount
};

