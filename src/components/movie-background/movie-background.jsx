import React from "react";
import PropTypes from "prop-types";


const MovieBackground = (props) => {
  const {name, image, backgroundColor} = props;

  return (
    <div className="movie-card__bg" style={{backgroundColor}}>
      <img src={image} alt={name}/>
    </div>
  );
};

MovieBackground.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired
};

export default MovieBackground;
