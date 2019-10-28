import React from "react";
import renderer from "react-test-renderer";
import {films} from "../../mocks/films.js";
import Catalog from "./catalog.jsx";

it(`Render correctly Catalog component`, () => {
  const component = renderer
    .create(
        <Catalog
          films={films}
        />
    ).toJSON();

  expect(component).toMatchSnapshot();
});
