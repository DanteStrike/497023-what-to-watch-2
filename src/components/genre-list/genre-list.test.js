import React from "react";
import renderer from "react-test-renderer";
import {GenreList} from "./genre-list.jsx";

it(`Render correctly Catalog component`, () => {
  const component = renderer
    .create(
        <GenreList
          genres={[`All genre`, `others`]}
          filterGenre={`All genre`}
          onGenreChange={jest.fn}
        />
    ).toJSON();

  expect(component).toMatchSnapshot();
});
