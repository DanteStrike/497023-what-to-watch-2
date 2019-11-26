import StoreNameSpace from "../store-name-space.js";

const getStoreSpace = (store) => store[StoreNameSpace.APP];
const getIsReady = (store) => getStoreSpace(store).isReady;

export default {
  getStoreSpace,
  getIsReady
};


