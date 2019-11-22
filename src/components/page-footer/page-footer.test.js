import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter as Router} from 'react-router-dom';
import PageFooter from "./page-footer.jsx";


it(`Render correctly PageFooter component`, () => {
  const PageFooterComponent = renderer
    .create(
        <Router>
          <PageFooter/>
        </Router>
    ).toJSON();

  expect(PageFooterComponent).toMatchSnapshot();
});
