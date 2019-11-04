import React from "react";
import PropTypes from "prop-types";
import MoviesList from "../movies-list/movies-list.jsx";
import {connect} from "react-redux";
import GenreList from "../genre-list/genre-list.jsx";
import {ActionCreator} from "../../reducer/reducer";

class Catalog extends React.PureComponent {
  constructor(props) {
    super(props);

    const {films} = props;

    this._genres = films.reduce((genres, film) => genres.add(film.genre), new Set([`All genre`]));
  }


  render() {
    const {films, filteredFilms, filterGenre, onGenreChange} = this.props;

    return (
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <GenreList
          genres={Array.from(this._genres)}
          filterGenre={filterGenre}
          onGenreChange={(genre) => onGenreChange(genre, films)}
        />

        <MoviesList
          films={filterGenre === `All genre` ? films : filteredFilms}
        />

        <div className="catalog__more">
          <button className="catalog__button" type="button">Show more</button>
        </div>
      </section>
    );
  }
}

Catalog.propTypes = {
  films: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    previewSrc: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired
  })).isRequired,

  filterGenre: PropTypes.string.isRequired,
  filteredFilms: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    previewSrc: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired
  })).isRequired,
  onGenreChange: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  filterGenre: state.filterGenre,
  filteredFilms: state.filteredFilms
});

const mapDispatchToProps = (dispatch) => ({
  onGenreChange: (genre, films) => {
    dispatch(ActionCreator.setGenreFilter(genre));
    dispatch(ActionCreator.filterFilms(films, genre));
  }
});

export {Catalog};

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
