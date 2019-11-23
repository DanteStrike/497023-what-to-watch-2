import StoreNameSpace from "../store-name-space.js";

const getStoreSpace = (store) => store[StoreNameSpace.CATALOG];
const getDisplayedFilmsAmount = (store) => getStoreSpace(store).displayedFilmsAmount;

export default {
  getStoreSpace,
  getDisplayedFilmsAmount
};
