import StoreNameSpace from "../store-name-space";

const getIsAuth = (state) => state[StoreNameSpace.USER].auth.isAuth;
const getAuthError = (state) => state[StoreNameSpace.USER].auth.error;
const getAvatarUrl = (state) => state[StoreNameSpace.USER].data.avatarUrl;

export default {
  getIsAuth,
  getAuthError,
  getAvatarUrl
};
