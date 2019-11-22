import React from "react";
import renderer from "react-test-renderer";
import UserBlock from "./user-block.jsx";


it(`Render correctly UserBlock component`, () => {
  const component = renderer
    .create(
        <UserBlock/>
    ).toJSON();

  expect(component).toMatchSnapshot();
});
