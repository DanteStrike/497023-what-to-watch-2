export const initStore = {
  app: {
    isReady: true
  },

  films: {
    data: {
      allIDs: [],
      byIDs: {}
    }
  },

  genreFilter: {
    currentFilter: `All genre`,
    data: {
      genres: [`All genre`],
      byGenres: {
        "All genre": [],
      }
    }
  }
};
