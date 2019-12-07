import React from "react";
import PropTypes from "prop-types";


const MoviePoster = (props) => {
  const {isBig, isSmall, name, image} = props;

  return (
    <div className={`movie-card__poster${isBig ? ` movie-card__poster--big` : ``}${isSmall ? ` movie-card__poster--small` : ``}`}>
      <img src={image} alt={name} width="218"
        height="327"/>
    </div>
  );
};

MoviePoster.propTypes = {
  isBig: PropTypes.bool.isRequired,
  isSmall: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};

export default MoviePoster;
