import {filmsOperations, filmsSelectors} from "../films/films.js";
import {genreFilterActions} from "../genres/genres.js";
import actions from "./actions.js";
import {userOperations} from "../user/user";

const setupApp = () => (dispatch, getState) => {
  const loadFilms = dispatch(filmsOperations.loadFilms())
    .then(() => {
      const filmsGenres = filmsSelectors.getAllFilmsGenres(getState());
      dispatch(genreFilterActions.setupFilterState(filmsGenres));
    });
  const loadPromo = dispatch(filmsOperations.loadPromo());

  return Promise.all([loadFilms, loadPromo])
    .then(() => {
      dispatch(userOperations.checkAuth())
        .then(() => {
          dispatch(userOperations.getMyListFilms());
        })
        .finally(dispatch(actions.setAppIsReady(true)));
    });
};


export default {
  setupApp
};
