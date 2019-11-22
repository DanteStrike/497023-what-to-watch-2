import React, {Fragment} from "react";
import PropTypes from "prop-types";
import PageHeader from "../page-header/page-header.jsx";
import UserBlock from "../user-block/user-block.jsx";
import PageFooter from "../page-footer/page-footer.jsx";
import MovieBackground from "../movie-background/movie-background.jsx";
import MoviePoster from "../movie-poster/movie-poster.jsx";
import MovieControlPanel from "../movie-control-panel/movie-control-panel.jsx";

const MoviePage = (props) => {
  const {renderTabs} = props;

  return (
    <Fragment>
      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <MovieBackground/>
          <h1 className="visually-hidden">WTW</h1>
          <PageHeader mixinClass={`movie-card__head`} rightPart={<UserBlock/>}/>
          <div className="movie-card__wrap">
            <MovieControlPanel/>
          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <MoviePoster isBig={true}/>
            {renderTabs()}
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div>MOVIE LIST</div>
        </section>

        <PageFooter/>
      </div>
    </Fragment>
  );
};

MoviePage.propTypes = {
  renderTabs: PropTypes.func
};


export default MoviePage;
