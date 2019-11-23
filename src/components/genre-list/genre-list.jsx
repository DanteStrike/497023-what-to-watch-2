import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {genreFilterActions, genreFilterSelectors} from "../../reducers/genre-filter";

const GenreList = (props) => {
  const {genres, currentFilter, onGenreChange} = props;

  const genreClickHandler = (evt, genre) => {
    evt.preventDefault();
    onGenreChange(genre);
  };

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre, index) => (
        <li key={`${index}_${genre}`} className={`catalog__genres-item ${genre === currentFilter ? `catalog__genres-item--active` : ``}`}>
          <a href="#" className="catalog__genres-link"
            onClick={(evt) => genreClickHandler(evt, genre)}>{genre}</a>
        </li>
      ))}
    </ul>
  );
};

GenreList.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  currentFilter: PropTypes.string.isRequired,
  onGenreChange: PropTypes.func.isRequired
};

const mapStateToProps = (store) => ({
  currentFilter: genreFilterSelectors.getCurrentFilter(store),
  genres: genreFilterSelectors.getGenres(store)
});

const mapDispatchToProps = (dispatch) => ({
  onGenreChange: (genre) => {
    dispatch(genreFilterActions.setCurrentFilter(genre));
  }
});

export {GenreList};

export default connect(mapStateToProps, mapDispatchToProps)(GenreList);
