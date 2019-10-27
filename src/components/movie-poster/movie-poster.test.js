import React from "react";
import renderer from "react-test-renderer";
import MoviePoster from "./movie-poster.jsx";

it(`Render correctly MoviePoster component`, () => {
  const component = renderer
    .create(
        <MoviePoster isBig={false}/>
    ).toJSON();

  expect(component).toMatchSnapshot();
});
