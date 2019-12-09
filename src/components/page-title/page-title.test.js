import React from "react";
import renderer from "react-test-renderer";
import PageTitle from "./page-title.jsx";


it(`Render correctly PageTitle component`, () => {
  const component = renderer
    .create(
        <PageTitle
          title="any"
        />
    ).toJSON();

  expect(component).toMatchSnapshot();
});
