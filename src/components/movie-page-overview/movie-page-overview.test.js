import React from "react";
import renderer from "react-test-renderer";

import MoviePageOverview from "./movie-page-overview.jsx";


it(`Render correctly MoviePageOverview component`, () => {
  const component = renderer
    .create(
        <MoviePageOverview
          rating={10}
          scoresCount={5}
          description={`any`}
          director={`director`}
          starring={[`star`, `star`]}
        />
    ).toJSON();

  expect(component).toMatchSnapshot();
});
