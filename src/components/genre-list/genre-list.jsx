import React from "react";
import PropTypes from "prop-types";

import {connect} from "react-redux";
import configs from "../../configs.js";

import {genreFilterActions, genreFilterSelectors} from "../../reducers/genres/genres";


const GenreList = (props) => {
  const {genres, currentFilter, onGenreChange} = props;
  const maxDisplayedAmount = configs.genreListConfig.maxDisplayedAmount;

  const handleGenreClick = (evt, genre) => {
    evt.preventDefault();
    onGenreChange(genre);
  };
  const maxGenresAmount = (genres.length > maxDisplayedAmount) ? maxDisplayedAmount : genres.length;

  return (
    <ul className="catalog__genres-list">
      {genres.slice(0, maxGenresAmount).map((genre, index) => (
        <li key={`${index}_${genre}`} className={`catalog__genres-item${genre === currentFilter ? ` catalog__genres-item--active` : ``}`}>
          <a href="#" className="catalog__genres-link"
            onClick={(evt) => handleGenreClick(evt, genre)}>{genre}</a>
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
