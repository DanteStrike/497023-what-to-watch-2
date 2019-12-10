import React, {Fragment} from "react";

import PageFooter from "../page-footer/page-footer.jsx";
import MoviePreview from "../movie-preview/movie-preview.jsx";
import CatalogAllFilms from "../catalog-all-films/catalog-all-films.jsx";


const MainPage = () => {
  return (
    <Fragment>
      <MoviePreview/>
      <div className="page-content">
        <CatalogAllFilms/>
        <PageFooter isLogoDisabled={true}/>
      </div>
    </Fragment>
  );
};

export default MainPage;
