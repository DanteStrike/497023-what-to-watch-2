import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter as Router} from 'react-router-dom';
import {MoviePreview} from "./movie-preview.jsx";


it(`Render correctly MoviePreview component`, () => {
  const promoMock = {
    id: 1,
    name: `any`,
    genre: `any`,
    posterImage: `url`,
    background: {
      color: `#FFF`,
      image: `url`,
    },
    released: 9999
  };
  const MoviePreviewComponent = renderer
    .create(
        <Router>
          <MoviePreview
            promo={promoMock}
          />
        </Router>
    ).toJSON();

  expect(MoviePreviewComponent).toMatchSnapshot();
});
