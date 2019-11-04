import React from "react";
import PropTypes from "prop-types";

const GenreList = (props) => {
  const {genres, filterGenre, onGenreChange} = props;

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre, index) => (
        <li key={`${index}_${genre}`} className={`catalog__genres-item ${genre === filterGenre ? `catalog__genres-item--active` : ``}`}>
          <a href="#" className="catalog__genres-link"
            onClick={(evt) => {
              evt.preventDefault();
              onGenreChange(genre);
            }}>{genre}</a>
        </li>
      ))}
    </ul>
  );
};

GenreList.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  filterGenre: PropTypes.string.isRequired,
  onGenreChange: PropTypes.func.isRequired
};

export default GenreList;
