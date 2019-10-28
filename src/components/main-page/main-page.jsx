import React, {Fragment} from "react";
import PropTypes from "prop-types";
import PageFooter from "../page-footer/page-footer.jsx";
import MoviePreview from "../movie-preview/movie-preview.jsx";
import Catalog from "../catalog/catalog.jsx";

const MainPage = (props) => {
  const {films} = props;

  return (
    <Fragment>
      <MoviePreview/>
      <div className="page-content">
        <Catalog
          films={films}
        />
        <PageFooter/>
      </div>
    </Fragment>

  );
};

MainPage.propTypes = {
  films: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }))
};

export default MainPage;
