import actions from "./actions.js";

const loadFilms = () => (dispatch, _, api) => {
  return api.get(`/films`)
    .then((response) => {
      dispatch(actions.loadFilms(response.data));
    });
};

export default {
  loadFilms
};
