import React from "react";
import PageHeader from "../page-header/page-header.jsx";
import MovieBackground from "../movie-background/movie-background.jsx";
import MoviePoster from "../movie-poster/movie-poster.jsx";
import MovieControlPanel from "../movie-control-panel/movie-control-panel.jsx";

const MoviePreview = () => {
  return (
    <section className="movie-card">
      <MovieBackground/>

      <h1 className="visually-hidden">WTW</h1>

      <PageHeader/>

      <div className="movie-card__wrap">
        <div className="movie-card__info">

          <MoviePoster
            isBig={false}
          />

          <MovieControlPanel/>
        </div>
      </div>
    </section>
  );
};

export default MoviePreview;
