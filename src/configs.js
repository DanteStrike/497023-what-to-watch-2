import Constants from "./constants";

const movieListConfig = {
  showTrailerTimeout: Constants.Time.MILLISECONDS_IN_SECOND
};

const genreListConfig = {
  maxDisplayedAmount: 10
};

const catalogAllFilmsConfig = {
  defaultGenre: Constants.GenreFilter.ALL_GENRE,
  defaultItemsAmount: 8,
  increaseAmountRate: 20
};

const catalogLikeThisConfig = {
  defaultItemsAmount: 4
};

const addReviewFormConfig = {
  starsAmount: 5,
  validationSettings: {
    comment: {
      minLength: 50,
      maxLength: 400
    }
  }
};

const videoPlayerConfig = {
  backgroundPoster: `img/player-poster.jpg`
};

export default {
  movieListConfig,
  genreListConfig,
  catalogAllFilmsConfig,
  catalogLikeThisConfig,
  addReviewFormConfig,
  videoPlayerConfig
};
