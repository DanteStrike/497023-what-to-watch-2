import utils from "./utils";
import StoreNameSpace from "../store-name-space";

const genreFilterStore = {
  currentFilter: utils.ALL_GENRE,
  data: {
    genres: [`All genre`, `genreOne`, `genreTwo`],
    byGenres: {
      "All genre": [1, 2, 3, 4],
      "genreOne": [2, 4],
      "genreTwo": [1, 3]
    }
  }
};

const store = {
  [StoreNameSpace.GENRES]: genreFilterStore
};

export default {
  genreFilterStore,
  store
};
