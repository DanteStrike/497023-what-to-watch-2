import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter as Router} from 'react-router-dom';
import {MoviesList} from "./movies-list.jsx";


it(`Render correctly MoviesList component`, () => {
  const filmsCardsMock = [{
    id: 1,
    name: `name`,
    preview: {
      image: `src`,
      videoSrc: `src`
    }
  }];

  const MoviePreviewComponent = renderer
    .create(
        <Router>
          <MoviesList
            filmsCards={filmsCardsMock}
          />
        </Router>,
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
