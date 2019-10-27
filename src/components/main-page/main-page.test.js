import React from "react";
import renderer from "react-test-renderer";
import {films} from "../../mocks/films.js";
import MainPage from "./main-page.jsx";

it(`Render correctly MainPage component`, () => {
  const component = renderer
    .create(
        <MainPage
          films={films}
        />
    ).toJSON();

  expect(component).toMatchSnapshot();
});
