import React from "react";
import renderer from "react-test-renderer";
import MainPage from "../main-page/main-page.jsx";
import {films} from "../../mocks/films.js";

it(`Render correctly MoviePage component`, () => {
  const component = renderer
    .create(
        <MainPage
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
