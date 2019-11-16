import React from "react";
import renderer from "react-test-renderer";
import MovieBackground from "./movie-background.jsx";


it(`Render correctly MovieBackground component`, () => {
  const component = renderer
    .create(
        <MovieBackground/>
    ).toJSON();

  expect(component).toMatchSnapshot();
});
