import StoreNameSpace from "../reducers/store-name-space.js";
import {films} from "./films.js";
import {comments} from "./comments.js";

export const initStore = {
  [StoreNameSpace.APP]: {
    isReady: false
  },

  [StoreNameSpace.FILMS]: {
    data: {
      allIDs: [],
      byIDs: {}
    },

    promo: {
      filmID: null
    }
  },

  [StoreNameSpace.COMMENTS]: {
    curFilmComments: []
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

  [StoreNameSpace.CATALOG]: {
    displayedFilmsAmount: 0
  }
};

export const loadedStore = {
  [StoreNameSpace.APP]: {
    isReady: true
  },

  [StoreNameSpace.FILMS]: {
    data: {
      byIDs: {
        "1": films[0],
        "3": films[1]
      },
      allIDs: [1, 3]
    },

    promo: {
      filmID: 3
    }
  },

  [StoreNameSpace.COMMENTS]: {
    curFilmComments: comments
  },

  [StoreNameSpace.GENRES]: {
    currentFilter: `All genre`,
    data: {
      genres: [`All genre`, `genreOne`, `genreTwo`],
      byGenres: {
        "All genre": [1, 3],
        "genreOne": [1],
        "genreTwo": [3]
      }
    }
  },

  [StoreNameSpace.CATALOG]: {
    displayedFilmsAmount: 0
  }
};
