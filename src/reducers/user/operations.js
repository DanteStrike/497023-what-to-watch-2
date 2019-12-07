import actions from "./actions";
import axios from "axios";
import {userSelectors} from "./index";

const checkAuth = () => (dispatch, _, api) => {
  return api.get(`/login`)
    .then((response) => {
      dispatch(actions.setAuthSuccess());
      dispatch(actions.setUserProfile(response.data));
    });
};

const sentAuthRequest = (email, password, source) => (dispatch, _, api) => {
  return api.post(`/login`, {
    email,
    password
  }, {
    cancelToken: source.token
  })
  .then((response) => {
    dispatch(actions.setAuthSuccess());
    dispatch(actions.setUserProfile(response.data));
  })
  .catch((err) => {
    if (axios.isCancel(err)) {
      return;
    }

    if (err.code === `ECONNABORTED`) {
      dispatch(actions.initAuthServerError(err.message));
      return;
    }

    if (err.response) {
      dispatch(actions.initAuthServerError(err.response.data.error));
    }
  });
};

const getMyListFilms = () => (dispatch, _, api) => {
  return api.get(`/favorite`)
    .then((response) => {
      dispatch(actions.setUserMyList(response.data));
    });
};

const toggleFavorite = (curFilmID, newStatus) => (dispatch, getState, api) => {
  return api.post(`/favorite/${curFilmID}/${newStatus}`)
    .then(() => {
      const oldMyListIDs = userSelectors.getFavoritesIDs(getState());

      if (newStatus) {
        dispatch(actions.addFilmToMylist(curFilmID, oldMyListIDs));
      } else {
        dispatch(actions.delFilmFromMyList(curFilmID, oldMyListIDs));
      }

      dispatch(actions.setFavoriteSuccess());
    })
    .catch((err) => {
      if (err.code === `ECONNABORTED`) {
        dispatch(actions.initFavoriteError(err.message));
        return;
      }

      if (err.response) {
        dispatch(actions.initFavoriteError(err.response.data.error));
      }
    });
};

export default {
  sentAuthRequest,
  checkAuth,
  getMyListFilms,
  toggleFavorite
};
