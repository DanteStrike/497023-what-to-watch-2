import React from "react";
import PropTypes from "prop-types";

const fixFirefoxFlickering = {
  willChange: `transform`
};

const MovieCard = (props) => {
  const {
    id,
    name,
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
        <a className="small-movie-card__link" href={`#${id}`}>{name}</a>
      </h3>
    </article>
  );
};

MovieCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onTimerStart: PropTypes.func.isRequired,
  onTimerReset: PropTypes.func.isRequired,
  renderTrailerPreview: PropTypes.func.isRequired
};

export default MovieCard;
