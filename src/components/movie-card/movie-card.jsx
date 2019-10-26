import React from "react";
import PropTypes from "prop-types";

const MovieCard = (props) => {
  const {
    id,
    title,
    image,
    titleLinkHref,
    onFilmMouseHover,
    onFilmMouseLeave
  } = props;

  const onCardMouseEnter = () => {
    onFilmMouseHover(id);
  };

  return (
    <article className="small-movie-card catalog__movies-card" onMouseEnter={onCardMouseEnter} onMouseLeave={onFilmMouseLeave}>
      <div className="small-movie-card__image">
        <img src={image} alt={title} width="280" height="175"/>
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href={titleLinkHref}>{title}</a>
      </h3>
    </article>
  );
};

MovieCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  titleLinkHref: PropTypes.string.isRequired,
  onFilmMouseHover: PropTypes.func.isRequired,
  onFilmMouseLeave: PropTypes.func.isRequired
};

export default MovieCard;
