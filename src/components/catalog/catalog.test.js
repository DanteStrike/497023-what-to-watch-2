import React from "react";
import renderer from "react-test-renderer";
import Catalog from "./catalog.jsx";

it(`Render correctly Catalog component`, () => {
  const component = renderer
    .create(
        <Catalog/>,
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
