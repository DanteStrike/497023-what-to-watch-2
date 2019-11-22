import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter as Router} from 'react-router-dom';
import PageNotFound from "./page-not-found.jsx";


it(`Render correctly PageNotFound component`, () => {
  const component = renderer
    .create(
        <Router>
          <PageNotFound/>
        </Router>
    ).toJSON();

  expect(component).toMatchSnapshot();
});
