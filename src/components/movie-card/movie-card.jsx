import React from "react";
import PropTypes from "prop-types";

import Video from "../video/video.jsx";
import ClearLink from "../clear-link/clear-link.jsx";


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
      <ClearLink to={`/films/${id}`}>
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
      </ClearLink>
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
