import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {RatingLevel} from "../../utils/enum.js";


const getRatingLevel = (rate) => {
  switch (true) {
    case (rate >= 0 && rate < 3):
      return RatingLevel.BAD;
    case (rate >= 3 && rate < 5):
      return RatingLevel.NORMAL;
    case (rate >= 5 && rate < 8):
      return RatingLevel.GOOD;
    case (rate >= 8 && rate < 10):
      return RatingLevel.VERY_GOOD;
    case (rate === 10):
      return RatingLevel.AWESOME;
    default:
      throw new Error(`rate = ${rate} is out of range [0, 10]`);
  }
};

const MoviePageOverview = (props) => {
  const {rating, scoresCount, description, director, starring} = props;

  return (
    <Fragment>
      <div className="movie-rating">
        <div className="movie-rating__score">{rating}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">
            {getRatingLevel(rating)}
          </span>
          <span className="movie-rating__count">{scoresCount} ratings</span>
        </p>
      </div>

      <div className="movie-card__text">
        <p>{description}</p>


        <p className="movie-card__director"><strong>Director: {director}</strong></p>

        <p className="movie-card__starring"><strong>Starring: {starring.map((star, index, arr) => (index !== arr.length - 1) ? `${star}, ` : `${star}`)} and
          other</strong></p>
      </div>
    </Fragment>
  );
};

MoviePageOverview.propTypes = {
  rating: PropTypes.number.isRequired,
  scoresCount: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  director: PropTypes.string.isRequired,
  starring: PropTypes.arrayOf(PropTypes.string).isRequired
};


export default MoviePageOverview;
