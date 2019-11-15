import {filmsActions} from "../films";
import {genreFilterActions} from "../genre-filter";


const setupApp = () => (dispatch, getState, api) => {
  return api.get(`/films`)
    .then((response) => {
      dispatch(filmsActions.loadFilms(response.data));
    })
    .then(() => {
      dispatch(genreFilterActions.setupFilterState(getState()));
    });
};

export default setupApp;
