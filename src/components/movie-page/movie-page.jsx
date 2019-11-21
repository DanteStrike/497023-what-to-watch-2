import React, {Fragment} from "react";
import PageHeader from "../page-header/page-header.jsx";
import PageFooter from "../page-footer/page-footer.jsx";
import MovieBackground from "../movie-background/movie-background.jsx";
import MoviePoster from "../movie-poster/movie-poster.jsx";
import MovieControlPanel from "../movie-control-panel/movie-control-panel.jsx";

const MoviePage = () => {
  return (
    <Fragment>
      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">

          <MovieBackground/>

          <h1 className="visually-hidden">WTW</h1>

          <PageHeader/>

          <div className="movie-card__wrap">

            <MovieControlPanel/>

          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">

            <MoviePoster
              isBig={true}
            />

            <div className="movie-card__desc">
              <nav className="movie-nav movie-card__nav">
                <ul className="movie-nav__list">
                  <li className="movie-nav__item movie-nav__item--active">
                    <a href="#" className="movie-nav__link">Overview</a>
                  </li>
                  <li className="movie-nav__item">
                    <a href="#" className="movie-nav__link">Details</a>
                  </li>
                  <li className="movie-nav__item">
                    <a href="#" className="movie-nav__link">Reviews</a>
                  </li>
                </ul>
              </nav>

              <div>Movie Overview</div>

            </div>
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


export default MoviePage;
