import React from "react";
import PropTypes from "prop-types";
import MovieCard from "../movie-card/movie-card.jsx";

class MoviesList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeFilmId: null
    };

    this._filmMouseOverHandler = this._filmMouseOverHandler.bind(this);
    this._filmMouseOutHandler = this._filmMouseOutHandler.bind(this);
  }

  render() {
    return (
      <div className="catalog__movies-list">
        {this.props.films.map((film) => (
          <MovieCard
            id={film.id}
            title={film.title}
            image={film.id === this.state.activeFilmId ? `https://miro.medium.com/max/800/1*MrWVkaCVte77OIv4THt8Hw.gif` : film.image}
            onFilmMouseOver={this._filmMouseOverHandler}
            onFilmMouseOut={this._filmMouseOutHandler}
            key={`${film.title}_${film.id}`}
          />
        ))
        }
      </div>
    );
  }

  _filmMouseOverHandler(filmId) {
    this.setState({
      activeFilmId: filmId
    });
  }

  _filmMouseOutHandler() {
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
