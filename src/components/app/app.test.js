import React from "react";
import renderer from "react-test-renderer";
import {films} from "../../mocks/films.js";
import App from "./app.jsx";

it(`render correctly App component`, () => {
  const component = renderer
    .create(
        <App
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
