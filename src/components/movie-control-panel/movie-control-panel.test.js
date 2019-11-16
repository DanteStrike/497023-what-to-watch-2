import React from "react";
import renderer from "react-test-renderer";
import MovieControlPanel from "./movie-control-panel.jsx";


it(`Render correctly MovieControlPanel component`, () => {
  const component = renderer
    .create(
        <MovieControlPanel/>
    ).toJSON();

  expect(component).toMatchSnapshot();
});
