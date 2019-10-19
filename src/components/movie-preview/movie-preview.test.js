import React from "react";
import renderer from "react-test-renderer";
import MoviePreview from "./movie-preview.jsx";

it(`render correctly MoviePreview component`, () => {
  const MoviePreviewComponent = renderer
    .create(
        <MoviePreview/>
    ).toJSON();

  expect(MoviePreviewComponent).toMatchSnapshot();
});
