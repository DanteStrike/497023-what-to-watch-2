import React from "react";
import renderer from "react-test-renderer";
import MovieCard from "./movie-card.jsx";

it(`render correctly MovieCard component`, () => {
  const MovieCardComponent = renderer
    .create(
        <MovieCard
          title = {`Johnny English`}
          image = {`img/johnny-english.jpg`}
          onMovieTitleClick = {jest.fn()}
        />
    ).toJSON();

  expect(MovieCardComponent).toMatchSnapshot();
});
