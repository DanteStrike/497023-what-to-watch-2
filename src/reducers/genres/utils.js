const ALL_GENRE = `All genre`;

const collectState = (filmsGenres) => {
  const result = filmsGenres.reduce((filter, filmGenre) => {
    const {id, genre} = filmGenre;
    filter.genres.add(genre);

    if (!(genre in filter.byGenres)) {
      filter.byGenres[genre] = [];
    }

    filter.byGenres[genre].push(id);
    filter.byGenres[ALL_GENRE].push(id);
    return filter;
  }, {
    genres: new Set([ALL_GENRE]),
    byGenres: {
      [ALL_GENRE]: []
    }
  });

  return {
    genres: Array.from(result.genres),
    byGenres: result.byGenres
  };
};

export default {
  collectState,
  ALL_GENRE
};
