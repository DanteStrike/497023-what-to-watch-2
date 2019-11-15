import React from "react";
import MoviesList from "../movies-list/movies-list.jsx";
import GenreList from "../genre-list/genre-list.jsx";

const Catalog = () => (
  <section className="catalog">
    <h2 className="catalog__title visually-hidden">Catalog</h2>
    <GenreList/>
    <MoviesList/>
    <div className="catalog__more">
      <button className="catalog__button" type="button">Show more</button>
    </div>
  </section>
);

export default Catalog;
