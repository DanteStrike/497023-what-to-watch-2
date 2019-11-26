import React from "react";
import renderer from "react-test-renderer";

import MoviePageDetails from "./movie-page-details.jsx";


it(`Render correctly MoviePageDetails component`, () => {
  const filmDetailsMock = {
    director: `director`,
    starring: [`star`, `star`],
    runTime: 99,
    genre: `any`,
    released: 9999
  };
  const component = renderer
    .create(
        <MoviePageDetails
          filmDetails={filmDetailsMock}
        />
    ).toJSON();

  expect(component).toMatchSnapshot();
});
