import React from "react";
import PropTypes from "prop-types";
import MovieCard from "../movie-card/movie-card.jsx";
import withTrailerPreview from "../../hocs/with-trailer-preview/with-trailer-preview.jsx";
import withTimer from "../../hocs/with-timer/with-timer.jsx";
import {compose} from "redux";
import {connect} from "react-redux";
import {filmsSelectors} from "../../reducers/films";

const WrappedMovieCard = compose(
    withTimer,
    withTrailerPreview
)(MovieCard);

const MoviesList = (props) => {
  const {filmsCards} = props;

  return (
    <div className="catalog__movies-list">
      {filmsCards.map((filmCard) => (
        <WrappedMovieCard
          key={`${filmCard.id}_${filmCard.name}`}

          id={filmCard.id}
          name={filmCard.name}

          poster={filmCard.preview.image}
          isMuted={true}
          previewSrc={filmCard.preview.videoSrc}
        />
      ))}
    </div>
  );
};

MoviesList.propTypes = {
  filmsCards: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    preview: PropTypes.exact({
      image: PropTypes.string.isRequired,
      videoSrc: PropTypes.string.isRequired
    }).isRequired
  }))
};

const mapStateToProps = (store) => ({
  filmsCards: filmsSelectors.getCurrentCardsInfo(store),
});

export {MoviesList};

export default connect(mapStateToProps)(MoviesList);
