import StoreNameSpace from "../reducers/store-name-space";

export const initStore = {
  [StoreNameSpace.APP]: {
    isReady: true
  },

  [StoreNameSpace.FILMS]: {
    data: {
      allIDs: [],
      byIDs: {}
    }
  },

  [StoreNameSpace.GENRES]: {
    currentFilter: `All genre`,
    data: {
      genres: [`All genre`],
      byGenres: {
        "All genre": [],
      }
    }
  },

  [StoreNameSpace.MOVIE_LIST]: {
    displayedFilmsAmount: 0
  }
};
