import React from "react";
import renderer from "react-test-renderer";
import MoviePage from "./movie-page.jsx";
import {films} from "../../mocks/films.js";

it(`Render correctly MoviePage component`, () => {
  const component = renderer
    .create(
        <MoviePage
          films={films}
        />,
        {
          createNodeMock: (element) => {
            if (element.type === `video`) {
              return {
                src: null,
                isMuted: null,
                poster: null
              };
            }
            return null;
          }
        }
    ).toJSON();

  expect(component).toMatchSnapshot();
});
