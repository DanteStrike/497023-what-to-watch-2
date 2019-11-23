import {filmsActions, filmsSelectors} from "../films/index.js";
import {genreFilterActions} from "../genres/index.js";
import actions from "./actions.js";


const setupApp = () => (dispatch, getState, api) => {
  return api.get(`/films`)
    .then((response) => {
      dispatch(filmsActions.loadFilms(response.data));
    })
    .then(() => {
      const filmsGenres = filmsSelectors.getAllFilmsGenres(getState());
      dispatch(genreFilterActions.setupFilterState(filmsGenres));
    })
    .then(() => {
      dispatch(actions.setAppIsReady(true));
    });
};


export default {
  setupApp
};
