import React from "react";
import renderer from "react-test-renderer";
import MovieOverview from "./movie-overview.jsx";

it(`Render correctly MovieOverview component`, () => {
  const component = renderer
    .create(
        <MovieOverview/>
    ).toJSON();

  expect(component).toMatchSnapshot();
});
