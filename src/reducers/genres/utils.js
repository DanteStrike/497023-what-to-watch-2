import Constants from "../../constants";

const collectState = (filmsGenres) => {
  const result = filmsGenres.reduce((filter, filmGenre) => {
    const {id, genre} = filmGenre;
    filter.genres.add(genre);

    if (!(genre in filter.byGenres)) {
      filter.byGenres[genre] = [];
    }

    filter.byGenres[genre].push(id);
    filter.byGenres[Constants.GenreFilter.ALL_GENRE].push(id);
    return filter;
  }, {
    genres: new Set([Constants.GenreFilter.ALL_GENRE]),
    byGenres: {
      [Constants.GenreFilter.ALL_GENRE]: []
    }
  });

  return {
    genres: Array.from(result.genres),
    byGenres: result.byGenres
  };
};

export default {
  collectState
};
