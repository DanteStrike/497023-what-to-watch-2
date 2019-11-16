import {filmsActions, filmsSelectors} from "../films/index.js";
import {genreFilterActions} from "../genre-filter/index.js";
import actions from "./actions.js";


const setupApp = () => (dispatch, getState, api) => {
  return api.get(`/films`)
    .then((response) => {
      dispatch(filmsActions.loadFilms(response.data));
    })
    .then(() => {
      const filmsGenre = filmsSelectors.getAllFilmsGenres(getState());
      dispatch(genreFilterActions.setupFilterState(filmsGenre));
    })
    .then(() => {
      dispatch(actions.setAppIsReady(true));
    });
};


export default {
  setupApp
};
