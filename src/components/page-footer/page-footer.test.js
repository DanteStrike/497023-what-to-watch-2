import React from "react";
import renderer from "react-test-renderer";
import PageFooter from "./page-footer.jsx";

it(`Render correctly PageFooter component`, () => {
  const PageFooterComponent = renderer
    .create(
        <PageFooter/>
    ).toJSON();

  expect(PageFooterComponent).toMatchSnapshot();
});
