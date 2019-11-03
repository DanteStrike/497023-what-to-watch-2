import React from "react";
import PropTypes from "prop-types";
import MovieCard from "../movie-card/movie-card.jsx";

class MoviesList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeFilmId: null,
      playPreview: false
    };

    this._previewTimderID = null;
  }

  _showPreview() {
    this.setState({
      playPreview: true
    });
  }

  _filmMouseHoverHandler(filmId) {
    this.setState({
      activeFilmId: filmId
    });

    this._previewTimderID = setTimeout(this._showPreview.bind(this), 1000);
  }

  _filmMouseLeaveHandler() {
    this.setState({
      activeFilmId: null,
      playPreview: false
    });

    if (this._previewTimderID !== null) {
      clearTimeout(this._previewTimderID);
      this._previewTimderID = null;
    }
  }

  _getMovieCard(film, activeFilmId, playPreview) {
    const videoPlayerOptions = {
      poster: film.image,
      isPlaying: film.id === activeFilmId && playPreview,
      isMuted: true,
      src: film.previewSrc
    };

    return (
      <MovieCard
        key={`${film.id}_${film.title}`}

        id={film.id}
        title={film.title}
        titleLinkHref={`/details`}
        onFilmMouseHover={(filmId) => this._filmMouseHoverHandler(filmId)}
        onFilmMouseLeave={() => this._filmMouseLeaveHandler()}

        videoPlayerOptions={videoPlayerOptions}
      />
    );
  }

  render() {
    const {films} = this.props;
    const {activeFilmId, playPreview} = this.state;

    return (
      <div className="catalog__movies-list">
        {films.map((film) => this._getMovieCard(film, activeFilmId, playPreview))}
      </div>
    );
  }
}

MoviesList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    previewSrc: PropTypes.string.isRequired
  }))
};

export default MoviesList;
