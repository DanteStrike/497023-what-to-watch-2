import React from "react";
import renderer from "react-test-renderer";
import MoviesList from "./movies-list.jsx";
import {films} from "../../mocks/films.js";

it(`Render correctly MoviesList component`, () => {
  const MoviePreviewComponent = renderer
    .create(
        <MoviesList
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

  expect(MoviePreviewComponent).toMatchSnapshot();
});
