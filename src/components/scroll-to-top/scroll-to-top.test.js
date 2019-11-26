import React from "react";
import renderer from "react-test-renderer";

import {ScrollToTop} from "./scroll-to-top.jsx";


it(`Render correctly ScrollToTop component`, () => {
  const locationMock = {
    pathname: `any`
  };
  const component = renderer
    .create(
        <ScrollToTop
          location={locationMock}
        />
    ).toJSON();

  expect(component).toMatchSnapshot();
});
