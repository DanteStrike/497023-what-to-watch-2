import React from "react";
import PropTypes from "prop-types";

const MoviePoster = (props) => {
  const {isBig} = props;

  return (
    <div className={`movie-card__poster${isBig ? ` movie-card__poster--big` : ``}`}>
      <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218"
        height="327"/>
    </div>
  );
};

MoviePoster.propTypes = {
  isBig: PropTypes.bool.isRequired
};

export default MoviePoster;
