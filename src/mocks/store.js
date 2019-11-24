import StoreNameSpace from "../reducers/store-name-space";
import {films} from "./films";

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
    curFilmComments: [
      {
        id: 1,
        user: {
          id: 4,
          name: `Kate Muir`,
        },
        rating: 8.9,
        comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
        date: `2019-05-08T14:13:56.569Z`
      }
    ]
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
