import React from "react";
import PageHeader from "../page-header/page-header.jsx";
import UserBlock from "../user-block/user-block.jsx";
import MovieBackground from "../movie-background/movie-background.jsx";
import MoviePoster from "../movie-poster/movie-poster.jsx";
import MovieControlPanel from "../movie-control-panel/movie-control-panel.jsx";


const MoviePreview = () => {
  return (
    <section className="movie-card">
      <MovieBackground/>
      <h1 className="visually-hidden">WTW</h1>
      <PageHeader mixinClass={`movie-card__head`} rightPart={<UserBlock/>}/>
      <div className="movie-card__wrap">
        <div className="movie-card__info">
          <MoviePoster/>
          <MovieControlPanel/>
        </div>
      </div>
    </section>
  );
};


export default MoviePreview;
