import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter as Router} from 'react-router-dom';
import MoviePreview from "./movie-preview.jsx";


it(`Render correctly MoviePreview component`, () => {
  const MoviePreviewComponent = renderer
    .create(
        <Router>
          <MoviePreview/>
        </Router>
    ).toJSON();

  expect(MoviePreviewComponent).toMatchSnapshot();
});
