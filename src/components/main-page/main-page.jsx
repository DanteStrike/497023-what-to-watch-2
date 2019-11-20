import React, {Fragment} from "react";
import PageFooter from "../page-footer/page-footer.jsx";
import MoviePreview from "../movie-preview/movie-preview.jsx";
import Catalog from "../catalog/catalog.jsx";
import {mainPageConfig} from "../../configs/main-page-config.js";


const MainPage = () => {
  return (
    <Fragment>
      <MoviePreview/>
      <div className="page-content">
        <Catalog
          defaultFilter={mainPageConfig.defaultGenreFilter}
          defaultItemsAmount={mainPageConfig.defaultDisplayedFilmsAmount}
          increaseAmountRate={mainPageConfig.increaseFilmsAmountRate}
        />
        <PageFooter/>
      </div>
    </Fragment>
  );
};


export default MainPage;
