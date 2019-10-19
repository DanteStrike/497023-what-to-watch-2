import React from "react";
import PropTypes from "prop-types";

const MovieCard = (props) => {
  const {title, image, onMovieTitleClick} = props;

  return (
    <article className="small-movie-card catalog__movies-card">
      <div className="small-movie-card__image">
        <img src={image} alt={title} width="280" height="175"/>
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html" onClick={onMovieTitleClick}>{title}</a>
      </h3>
    </article>
  );
};

MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  onMovieTitleClick: PropTypes.func.isRequired
};

export default MovieCard;
