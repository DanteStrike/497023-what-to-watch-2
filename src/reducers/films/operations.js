import {filmsActions} from "./films";

const loadFilms = () => (dispatch, _, api) => {
  return api.get(`/films`)
    .then((response) => {
      dispatch(filmsActions.loadFilms(response.data));
    });
};

const loadPromo = () => (dispatch, _, api) => {
  return api.get(`/films/promo`)
    .then((response) => {
      dispatch(filmsActions.loadPromo(response.data));
    });
};

export default {
  loadFilms,
  loadPromo
};
