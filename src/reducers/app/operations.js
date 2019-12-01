import {filmsOperations, filmsSelectors} from "../films/index.js";
import {genreFilterActions} from "../genres/index.js";
import actions from "./actions.js";
import {userOperations} from "../user";

const setupApp = () => (dispatch, getState) => {
  const loadFilms = dispatch(filmsOperations.loadFilms())
    .then(() => {
      const filmsGenres = filmsSelectors.getAllFilmsGenres(getState());
      dispatch(genreFilterActions.setupFilterState(filmsGenres));
    });
  const loadPromo = dispatch(filmsOperations.loadPromo());
  dispatch(userOperations.checkAuth())
    .then(() => {
      dispatch(userOperations.getMyListFilms());
    });

  return Promise.all([loadFilms, loadPromo])
    .then(() => {
      dispatch(actions.setAppIsReady(true));
    });
};


export default {
  setupApp
};
