import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter as Router} from 'react-router-dom';

import MovieCard from "./movie-card.jsx";


it(`Render correctly MovieCard component`, () => {
  const MovieCardComponent = renderer
    .create(
        <Router>
          <MovieCard
            id={1}
            name={`Johnny English`}
            image={`img/johnny-english.jpg`}
            onTimerStart={jest.fn()}
            onTimerReset={jest.fn()}
            renderTrailerPreview={jest.fn()}
          />
        </Router>
    ).toJSON();

  expect(MovieCardComponent).toMatchSnapshot();
});
