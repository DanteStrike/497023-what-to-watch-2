import React, {Fragment} from "react";
import MovieCard from "../movie-card/movie-card.jsx";
import PageContent from "../page-content/page-content.jsx";

const App = () => {
  return (
    <Fragment>
      <MovieCard/>
      <PageContent/>
    </Fragment>
  );
};

export default App;
