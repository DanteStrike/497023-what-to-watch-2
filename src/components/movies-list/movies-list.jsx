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

    this._filmMouseHoverHandler = this._filmMouseHoverHandler.bind(this);
    this._filmMouseLeaveHandler = this._filmMouseLeaveHandler.bind(this);
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

  render() {
    const {films} = this.props;

    return (
      <div className="catalog__movies-list">
        {films.map((film) => (
          <MovieCard
            id={film.id}
            title={film.title}

            image={film.image}
            playPreview={film.id === this.state.activeFilmId && this.state.playPreview}
            isMuted={true}
            src={film.previewSrc}

            titleLinkHref={`/details`}
            onFilmMouseHover={this._filmMouseHoverHandler}
            onFilmMouseLeave={this._filmMouseLeaveHandler}
            key={`${film.id}_${film.title}`}
          />
        ))
        }
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
