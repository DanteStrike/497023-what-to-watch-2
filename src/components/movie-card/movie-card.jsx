import React from "react";
import PropTypes from "prop-types";
import VideoPlayer from "../video-player/video-player.jsx";

const MovieCard = (props) => {
  const {
    id,
    title,
    titleLinkHref,
    onFilmMouseHover,
    onFilmMouseLeave,
    videoPlayerOptions
  } = props;

  const onCardMouseEnter = () => {
    onFilmMouseHover(id);
  };

  return (
    <article className="small-movie-card catalog__movies-card" onMouseEnter={onCardMouseEnter} onMouseLeave={onFilmMouseLeave}>
      <div className="small-movie-card__image">
        <VideoPlayer {...videoPlayerOptions} />
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
  titleLinkHref: PropTypes.string.isRequired,
  onFilmMouseHover: PropTypes.func.isRequired,
  onFilmMouseLeave: PropTypes.func.isRequired,

  videoPlayerOptions: PropTypes.exact({
    poster: PropTypes.string.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    isMuted: PropTypes.bool.isRequired,
    src: PropTypes.string.isRequired,
  })
};

export default MovieCard;
