import React from "react";
import PropTypes from "prop-types";
import MainPage from "../main-page/main-page.jsx";
import MoviePage from "../movie-page/movie-page.jsx";

const getPage = (films) => {
  switch (location.pathname) {
    case `/`:
    case `/main`:
      return (
        <MainPage
          films={films}
        />
      );
    case `/details`:
      return (
        <MoviePage
          films={films}
        />
      );
  }

  return null;
};

const App = (props) => {
  const {films} = props;

  return (
    getPage(films)
  );
};

App.propTypes = {
  films: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }))
};

export default App;
