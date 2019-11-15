const ALL_GENRE = `All genre`;

const collectState = (filmsGenres) => filmsGenres.reduce((filter, filmGenre) => {
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

export default {
  collectState,
  ALL_GENRE
};
