import React from "react";
import renderer from "react-test-renderer";
import PageHeader from "./page-header.jsx";


it(`Render correctly PageHeader component`, () => {
  const PageHeaderComponent = renderer
    .create(
        <PageHeader/>
    ).toJSON();

  expect(PageHeaderComponent).toMatchSnapshot();
});
