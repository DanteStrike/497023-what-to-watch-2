import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter as Router} from 'react-router-dom';
import Logo from "./logo.jsx";


it(`Render correctly Logo component`, () => {
  const component = renderer
    .create(
        <Router>
          <Logo/>
        </Router>
    ).toJSON();

  expect(component).toMatchSnapshot();
});
