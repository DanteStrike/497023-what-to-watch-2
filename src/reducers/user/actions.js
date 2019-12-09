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

const initAuthServerError = (errMsg) => {
  const errDetails = utils.decodeServerErrMsg(errMsg);
  return {
    type: types.INIT_AUTH_SERVER_ERROR,
    payload: {
      target: errDetails.target,
      msg: errDetails.msg
    }
  };
};

const setUserProfile = (userProfileRAW) => ({
  type: types.SET_USER_PROFILE,
  payload: utils.adaptUserProfile(userProfileRAW)
});

const setUserMyList = (myListFilmsRAW) => ({
  type: types.SET_USER_MY_LIST,
  payload: utils.getIDsList(myListFilmsRAW)
});

const clearUserData = () => ({
  type: types.CLEAR_USER_DATA
});

const addFilmToMylist = (filmID, oldMyListIDs) => {
  const newMyListIDs = oldMyListIDs.slice();
  newMyListIDs.push(filmID);
  return {
    type: types.SET_USER_MY_LIST,
    payload: newMyListIDs
  };
};

const delFilmFromMyList = (filmID, oldMyListIDs) => {
  const foundedFilmID = oldMyListIDs.indexOf(filmID);
  const newMyListIDs = oldMyListIDs.slice();
  newMyListIDs.splice(foundedFilmID, 1);
  return {
    type: types.SET_USER_MY_LIST,
    payload: newMyListIDs
  };
};

const setFavoriteSuccess = () => ({
  type: types.SET_FAVORITE_SUCCESS
});

const initFavoriteError = () => ({
  type: types.INIT_FAVORITE_ERROR
});

const resetFavoriteError = () => ({
  type: types.RESET_FAVORITE_ERROR
});

const setMyListLoaded = () => ({
  type: types.SET_MY_LIST_LOADED
});

export default {
  setAuthSuccess,
  setAuthRequired,
  resetAuthErrors,
  initAuthServerError,
  setUserProfile,
  setUserMyList,
  clearUserData,
  addFilmToMylist,
  delFilmFromMyList,
  setFavoriteSuccess,
  initFavoriteError,
  resetFavoriteError,
  setMyListLoaded
};
