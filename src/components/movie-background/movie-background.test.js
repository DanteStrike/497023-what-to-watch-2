import React from "react";
import renderer from "react-test-renderer";
import MovieBackground from "./movie-background.jsx";


it(`Render correctly MovieBackground component`, () => {
  const component = renderer
    .create(
        <MovieBackground
          name="any"
          backgroundColor="color"
          image="url"
        />
    ).toJSON();

  expect(component).toMatchSnapshot();
});
