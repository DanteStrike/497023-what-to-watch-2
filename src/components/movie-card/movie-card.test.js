import React from "react";
import renderer from "react-test-renderer";
import MovieCard from "./movie-card.jsx";

it(`Render correctly MovieCard component`, () => {
  const MovieCardComponent = renderer
    .create(
        <MovieCard
          id={2}
          title={`Johnny English`}
          image={`img/johnny-english.jpg`}
          titleLinkHref={`#`}
          onFilmMouseHover={jest.fn()}
          onFilmMouseLeave={jest.fn()}
        />
    ).toJSON();

  expect(MovieCardComponent).toMatchSnapshot();
});
