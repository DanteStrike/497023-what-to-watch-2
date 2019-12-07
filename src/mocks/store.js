import StoreNameSpace from "../reducers/store-name-space.js";
import {comments} from "./comments.js";
import {normalizedFilmsData} from "./films";

export const initStore = {
  [StoreNameSpace.APP]: {
    isReady: false,
    videoPlayerFilmID: -1
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
    postCommentState: {
      isSuccess: false,
      error: {
        isError: false,
        msg: ``
      }
    },
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
  },

  [StoreNameSpace.USER]: {
    auth: {
      isAuth: false,
      error: {
        isError: false,
        target: ``,
        msg: ``
      }
    },

    toggleFavoriteStatus: {
      isSuccess: false,
      error: {
        isError: false,
        msg: ``
      }
    },

    data: {
      id: null,
      email: ``,
      name: ``,
      avatarUrl: ``,
      myListFilmsIDs: []
    }
  }
};

export const loadedStore = {
  [StoreNameSpace.APP]: {
    isReady: true,
    videoPlayerFilmID: 1
  },

  [StoreNameSpace.FILMS]: {
    data: normalizedFilmsData,

    promo: {
      filmID: 3
    }
  },

  [StoreNameSpace.COMMENTS]: {
    postCommentState: {
      isSuccess: true,
      error: {
        isError: false,
        msg: ``
      }
    },
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
  },

  [StoreNameSpace.USER]: {
    auth: {
      isAuth: true,
      error: {
        isError: true,
        target: `target`,
        msg: `any`
      }
    },

    toggleFavoriteStatus: {
      isSuccess: true,
      error: {
        isError: false,
        msg: ``
      }
    },

    data: {
      id: 1,
      email: `Oliver.conner@gmail.com`,
      name: `Oliver.conner`,
      avatarUrl: `img/1.png`,
      myListFilmsIDs: [3]
    }
  },
};
