import React from "react";
import renderer from "react-test-renderer";

import MoviePageDetails from "./movie-page-details.jsx";


it(`Render correctly MoviePageDetails component`, () => {
  const component = renderer
    .create(
        <MoviePageDetails
          director={`director`}
          starring={[`star`, `star`]}
          runTime={99}
          genre={`any`}
          released={9999}
        />
    ).toJSON();

  expect(component).toMatchSnapshot();
});
