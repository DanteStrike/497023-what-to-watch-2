import React from "react";
import renderer from "react-test-renderer";

import Review from "./review.jsx";


it(`Render correctly Review component`, () => {
  const component = renderer
    .create(
        <Review
          author={`author`}
          rating={10}
          comment={`any`}
          date={0}
        />
    ).toJSON();

  expect(component).toMatchSnapshot();
});
