const getCurrentFilter = (store) => store.genreFilter.currentFilter;
const getGenres = (store) => Array.from(store.genreFilter.data.genres);

const getCurrentFilterFilmsIDs = (store) => store.genreFilter.data.byGenres[getCurrentFilter(store)];
const getCurrentFilterFilmsAmount = (store) => getCurrentFilterFilmsIDs(store).length;

export default {
  getCurrentFilter,
  getGenres,
  getCurrentFilterFilmsIDs,
  getCurrentFilterFilmsAmount
};

