import React from "react";
import MainPage from "../main-page/main-page.jsx";
import MoviePage from "../movie-page/movie-page.jsx";

const getPage = (props) => {
  switch (location.pathname) {
    case `/`:
    case `/main`:
      return (
        <MainPage
          {...props}
        />
      );
    case `/details`:
      return (
        <MoviePage
          {...props}
        />
      );
  }

  return null;
};

const App = (props) => {
  return (
    getPage(props)
  );
};

export default App;
