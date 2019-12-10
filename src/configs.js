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
  scoreScaleCoefficient: 1,
  validationSettings: {
    comment: {
      minLength: 50,
      maxLength: 400
    }
  }
};

const videoPlayerConfig = {
  volume: {
    maxVolume: 100,
    minVolume: 0,
    defaultValue: 20,
    step: 5
  },
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
