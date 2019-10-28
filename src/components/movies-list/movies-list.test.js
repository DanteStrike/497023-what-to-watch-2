import React from "react";
import renderer from "react-test-renderer";
import MoviesList from "./movies-list.jsx";
import {films} from "../../mocks/films.js";

it(`Render correctly MoviesList component`, () => {
  const MoviePreviewComponent = renderer
    .create(
        <MoviesList
          films={films}
        />
    ).toJSON();

  expect(MoviePreviewComponent).toMatchSnapshot();
});
