import React from "react";
import PropTypes from "prop-types";
import MovieCard from "../movie-card/movie-card.jsx";
import withTrailerPreview from "../../hocs/with-trailer-preview/with-trailer-preview.jsx";
import withTimer from "../../hocs/with-timer/with-timer.jsx";
import {compose} from "redux";

const WrappedMovieCard = compose(
    withTimer,
    withTrailerPreview
)(MovieCard);

const MoviesList = (props) => {
  const {films} = props;

  return (
    <div className="catalog__movies-list">
      {films.map((film) => (
        <WrappedMovieCard
          key={`${film.id}_${film.title}`}

          id={film.id}
          title={film.title}
          titleLinkHref={`/details`}

          poster={film.image}
          isMuted={true}
          previewSrc={film.previewSrc}
        />
      ))}
    </div>
  );
};

MoviesList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    previewSrc: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired
  }))
};

export default MoviesList;
