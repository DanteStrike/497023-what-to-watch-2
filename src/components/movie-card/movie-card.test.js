import React from "react";
import renderer from "react-test-renderer";
import MovieCard from "./movie-card.jsx";

it(`Render correctly MovieCard component`, () => {
  const MovieCardComponent = renderer
    .create(
        <MovieCard
          title={`Johnny English`}
          image={`img/johnny-english.jpg`}
          titleLinkHref={`#`}
          onTimerStart={jest.fn()}
          onTimerReset={jest.fn()}
          renderTrailerPreview={jest.fn()}
        />
    ).toJSON();

  expect(MovieCardComponent).toMatchSnapshot();
});
