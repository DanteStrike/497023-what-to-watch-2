import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter as Router} from 'react-router-dom';
import PageHeader from "./page-header.jsx";


it(`Render correctly PageHeader component`, () => {
  const PageHeaderComponent = renderer
    .create(
        <Router>
          <PageHeader/>
        </Router>
    ).toJSON();

  expect(PageHeaderComponent).toMatchSnapshot();
});
