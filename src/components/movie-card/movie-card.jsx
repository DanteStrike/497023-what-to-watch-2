import React from "react";
import PropTypes from "prop-types";

const MovieCard = (props) => {
  const {
    id,
    title,
    image,
    onFilmMouseOver,
    onFilmMouseOut
  } = props;

  const onCardMouseOver = () => {
    onFilmMouseOver(id);
  };

  return (
    <article className="small-movie-card catalog__movies-card" onMouseOver={onCardMouseOver} onMouseOut={onFilmMouseOut}>
      <div className="small-movie-card__image">
        <img src={image} alt={title} width="280" height="175"/>
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html">{title}</a>
      </h3>
    </article>
  );
};

MovieCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  onFilmMouseOver: PropTypes.func.isRequired,
  onFilmMouseOut: PropTypes.func.isRequired
};

export default MovieCard;
