import StoreNameSpace from "../store-name-space.js";

const getStoreSpace = (store) => store[StoreNameSpace.MOVIE_LIST];
const getDisplayedFilmsAmount = (store) => getStoreSpace(store).displayedFilmsAmount;

export default {
  getStoreSpace,
  getDisplayedFilmsAmount
};
