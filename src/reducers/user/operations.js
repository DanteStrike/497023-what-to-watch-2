import actions from "./actions";
import axios from "axios";

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

export default {
  sentAuthRequest,
  checkAuth,
  getMyListFilms
};
