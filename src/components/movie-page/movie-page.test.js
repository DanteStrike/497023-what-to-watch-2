import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter as Router} from "react-router-dom";
import {MoviePage} from "./movie-page.jsx";
import {films} from "../../mocks/films";


it(`Render correctly MoviePage component`, () => {
  const matchMock = {
    params: {
      id: `1`
    }
  };
  const component = renderer
    .create(
        <Router>
          <MoviePage
            match={matchMock}
            film={films[0]}
          />
        </Router>
    ).toJSON();

  expect(component).toMatchSnapshot();
});
