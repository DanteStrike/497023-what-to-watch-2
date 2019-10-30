import React, {Fragment} from "react";
import PageFooter from "../page-footer/page-footer.jsx";
import MoviePreview from "../movie-preview/movie-preview.jsx";
import Catalog from "../catalog/catalog.jsx";

const MainPage = (props) => {
  return (
    <Fragment>
      <MoviePreview/>
      <div className="page-content">
        <Catalog
          {...props}
        />
        <PageFooter/>
      </div>
    </Fragment>

  );
};

export default MainPage;
