import React from "react";
import MainPage from "../main-page/main-page.jsx";
// import MoviePage from "../movie-page/movie-page.jsx";

const getPage = () => {
  switch (location.pathname) {
    case `/`:
    case `/main`:
      return (
        <MainPage/>
      );
    // case `/details`:
    //   return (
    //     <MoviePage/>
    //   );
  }

  return null;
};

const App = () => {
  return (
    getPage()
  );
};

export default App;
