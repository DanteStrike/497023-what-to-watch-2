import React from "react";
import renderer from "react-test-renderer";
import MoviePreview from "./movie-preview.jsx";


it(`Render correctly MoviePreview component`, () => {
  const MoviePreviewComponent = renderer
    .create(
        <MoviePreview/>
    ).toJSON();

  expect(MoviePreviewComponent).toMatchSnapshot();
});
