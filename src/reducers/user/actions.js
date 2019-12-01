import types from "./types";
import utils from "./utils";

const setAuthSuccess = () => ({
  type: types.SET_AUTH_SUCCESS
});

const setAuthRequired = () => ({
  type: types.SET_AUTH_REQUIRED
});

const resetAuthErrors = () => ({
  type: types.RESET_AUTH_ERRORS
});

const initAuthServerError = (errMsg) => ({
  type: types.INIT_AUTH_SERVER_ERROR,
  payload: errMsg
});

const setUserProfile = (userProfileRAW) => ({
  type: types.SET_USER_PROFILE,
  payload: utils.adaptUserProfile(userProfileRAW)
});

const setUserMyList = (myListFilmsRAW) => ({
  type: types.SET_USER_MYLIST,
  payload: utils.getIDsList(myListFilmsRAW)
});

const clearUserData = () => ({
  type: types.CLEAR_USER_DATA
});

export default {
  setAuthSuccess,
  setAuthRequired,
  resetAuthErrors,
  initAuthServerError,
  setUserProfile,
  setUserMyList,
  clearUserData
};
