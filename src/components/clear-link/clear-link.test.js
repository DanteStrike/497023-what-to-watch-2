import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter as Router} from "react-router-dom";
import ClearLink from "./clear-link.jsx";

it(`Component ClearLink should render correctly`, () => {
  const MockComponent = () => <div/>;

  const component = renderer.create(
      <Router>
        <ClearLink to="any">
          <MockComponent/>
        </ClearLink>
      </Router>
  ).toJSON();

  expect(component).toMatchSnapshot();
});
