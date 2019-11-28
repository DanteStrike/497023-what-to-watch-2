import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import Video from "../video/video.jsx";

const fixFirefoxFlickering = {
  willChange: `transform`
};

const MovieCard = (props) => {
  const {
    id,
    name,
    onTimerStart,
    onTimerReset,
    previewSrc,
    poster,
    isTimerFinished
  } = props;

  return (
    <article className="small-movie-card catalog__movies-card" style={fixFirefoxFlickering} onMouseEnter={onTimerStart} onMouseLeave={onTimerReset}>
      <Link to={`/films/${id}`} style={{textDecoration: `none`, color: `unset`}}>
        <div className="small-movie-card__image">
          <Video
            poster={poster}
            isActivePlayer={isTimerFinished}
            isMuted={true}
            src={previewSrc}
            isAutoReset={true}
            preload={`none`}
          />
        </div>
        <h3 className="small-movie-card__title">
          {name}
        </h3>
      </Link>
    </article>
  );
};

MovieCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  isTimerFinished: PropTypes.bool.isRequired,
  previewSrc: PropTypes.string.isRequired,
  onTimerStart: PropTypes.func.isRequired,
  onTimerReset: PropTypes.func.isRequired,
};

export default MovieCard;
