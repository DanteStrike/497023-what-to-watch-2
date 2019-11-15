import React from "react";
import renderer from "react-test-renderer";
import {MoviesList} from "./movies-list.jsx";

const filmsCardsMock = [{
  id: 1,
  name: `name`,
  preview: {
    image: `src`,
    videoSrc: `src`
  }
}];

it(`Render correctly MoviesList component`, () => {
  const MoviePreviewComponent = renderer
    .create(
        <MoviesList
          filmsCards={filmsCardsMock}
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
