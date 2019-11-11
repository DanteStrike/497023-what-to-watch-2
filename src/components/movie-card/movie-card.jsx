import React from "react";
import PropTypes from "prop-types";

const fixFirefoxFlickering = {
  willChange: `transform`
};

const MovieCard = (props) => {
  const {
    title,
    titleLinkHref,
    onTimerStart,
    onTimerReset,
    renderTrailerPreview
  } = props;

  return (
    <article className="small-movie-card catalog__movies-card" style={fixFirefoxFlickering} onMouseEnter={onTimerStart} onMouseLeave={onTimerReset}>
      <div className="small-movie-card__image">
        {renderTrailerPreview()}
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href={titleLinkHref}>{title}</a>
      </h3>
    </article>
  );
};

MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  titleLinkHref: PropTypes.string.isRequired,
  onTimerStart: PropTypes.func.isRequired,
  onTimerReset: PropTypes.func.isRequired,
  renderTrailerPreview: PropTypes.func.isRequired
};

export default MovieCard;
