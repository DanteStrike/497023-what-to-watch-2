import StoreNameSpace from "../store-name-space";

const getUserStore = (store) => store[StoreNameSpace.USER];
const getIsAuth = (store) => getUserStore(store).auth.isAuth;
const getAuthError = (store) => getUserStore(store).auth.error;
const getAvatarUrl = (store) => getUserStore(store).data.avatarUrl;
const getFavoritesIDs = (store) => getUserStore(store).data.myListFilmsIDs;
const getFavoriteError = (store) => getUserStore(store).toggleFavoriteStatus;
const getMyListStatus = (store) => getUserStore(store).myListStatus;

export default {
  getIsAuth,
  getAuthError,
  getAvatarUrl,
  getFavoritesIDs,
  getFavoriteError,
  getMyListStatus
};
