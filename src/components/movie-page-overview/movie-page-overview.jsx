import React, {Fragment} from "react";
import PropTypes from "prop-types";

import {getRatingLevel} from "../../utils/rating-level/rating-level";

const MoviePageOverview = (props) => {
  const {filmOverview: {rating, scoresCount, description, director, starring}} = props;

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
  filmOverview: PropTypes.shape({
    rating: PropTypes.number.isRequired,
    scoresCount: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired
};

export default MoviePageOverview;
