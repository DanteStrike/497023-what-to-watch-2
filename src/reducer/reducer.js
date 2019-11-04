
const filterFilmsByGenre = (films, genre) => {
  return films.filter((film) => film.genre === genre);
};

const ActionCreator = {
  setGenreFilter: (genre) => ({
    type: `SET_GENRE_FILTER`,
    payload: genre
  }),

  filterFilms: (films, genre) => {
    return {
      type: `SET_FILTERED_FILMS`,
      payload: genre !== `All genre` ? filterFilmsByGenre(films, genre) : films.slice()
    };
  }
};

const initialState = {
  filterGenre: `All genre`,
  filteredFilms: []
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case `SET_GENRE_FILTER`:
      return Object.assign({}, state, {
        filterGenre: action.payload
      });
    case `SET_FILTERED_FILMS`:
      return Object.assign({}, state, {
        filteredFilms: action.payload
      });
  }

  return state;
};

export {reducer, filterFilmsByGenre, ActionCreator};

