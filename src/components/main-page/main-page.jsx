import React, {Fragment} from "react";
import PropTypes from "prop-types";
import PageFooter from "../page-footer/page-footer.jsx";
import MoviePreview from "../movie-preview/movie-preview.jsx";
import Catalog from "../catalog/catalog.jsx";

const MainPage = (props) => {

  return (
    <Fragment>
      <MoviePreview/>
      <div className="page-content">
        <Catalog
          moviesList = {props.moviesList}
        />
        <PageFooter/>
      </div>
    </Fragment>

  );
};

MainPage.propTypes = {
  moviesList: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }))
};

export default MainPage;
