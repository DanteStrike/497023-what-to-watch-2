import React from "react";
import PropTypes from "prop-types";
import MainPage from "../main-page/main-page.jsx";

const App = (props) => {

  return (
    <MainPage
      moviesList = {props.moviesList}
    />
  );
};

App.propTypes = {
  moviesList: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }))
};

export default App;
