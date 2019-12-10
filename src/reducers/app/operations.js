import {filmsOperations, filmsSelectors} from "../films/films.js";
import {genreFilterActions} from "../genres/genres.js";
import actions from "./actions.js";
import {userOperations} from "../user/user";
import Constants from "../../constants";

const setupApp = () => (dispatch, getState) => {
  const loadFilms = dispatch(filmsOperations.loadFilms())
    .then(() => {
      const filmsGenres = filmsSelectors.getAllFilmsGenres(getState());
      dispatch(genreFilterActions.setupFilterState(filmsGenres));
    });
  const loadPromo = dispatch(filmsOperations.loadPromo());

  return Promise.all([loadFilms, loadPromo])
    .then(() => {
      dispatch(actions.identifyEdgeBrowser());
      dispatch(userOperations.checkAuth())
        .then(() => {
          dispatch(userOperations.getMyListFilms())
            .then(() => dispatch(actions.setAppIsReady(true)));
        })
        .catch(() => dispatch(actions.setAppIsReady(true)));
    })
    .catch((err) => {
      if (err.code === Constants.RequestErrorCode.TIMEOUT) {
        dispatch(actions.initSetupAppError(err.code, err.message));
        return;
      }

      if (err.response) {
        dispatch(actions.initSetupAppError(err.response.status, err.response.data.error));
      } else {
        dispatch(actions.initSetupAppError(null, err.message));
      }
    });
};


export default {
  setupApp
};
