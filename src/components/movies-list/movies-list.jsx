import React from "react";
import PropTypes from "prop-types";
import MovieCard from "../movie-card/movie-card.jsx";

class MoviesList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeFilmId: null
    };

    this._filmMouseHoverHandler = this._filmMouseHoverHandler.bind(this);
    this._filmMouseLeaveHandler = this._filmMouseLeaveHandler.bind(this);
  }

  render() {
    return (
      <div className="catalog__movies-list">
        {this.props.films.map((film) => (
          <MovieCard
            id={film.id}
            title={film.title}
            image={film.id === this.state.activeFilmId ? `https://miro.medium.com/max/800/1*MrWVkaCVte77OIv4THt8Hw.gif` : film.image}
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

  _filmMouseHoverHandler(filmId) {
    this.setState({
      activeFilmId: filmId
    });
  }

  _filmMouseLeaveHandler() {
    this.setState({
      activeFilmId: null
    });
  }
}

MoviesList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }))
};

export default MoviesList;
