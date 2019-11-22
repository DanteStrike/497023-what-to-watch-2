import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter as Router} from "react-router-dom";
import UserBlock from "./user-block.jsx";


it(`Render correctly UserBlock component`, () => {
  const component = renderer
    .create(
        <Router>
          <UserBlock/>
        </Router>
    ).toJSON();

  expect(component).toMatchSnapshot();
});
