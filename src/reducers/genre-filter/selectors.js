const getCurrentFilter = (store) => store.genreFilter.currentFilter;

const getCurrentFilterFilmsIDs = (store) => store.genreFilter.data.byGenres[getCurrentFilter(store)];

export default {
  getCurrentFilter,
  getCurrentFilterFilmsIDs
};

