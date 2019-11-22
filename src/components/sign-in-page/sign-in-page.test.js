import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter as Router} from 'react-router-dom';
import SignInPage from "./sign-in-page.jsx";


it(`Render correctly SignInPage component`, () => {
  const component = renderer
    .create(
        <Router>
          <SignInPage/>
        </Router>
    ).toJSON();

  expect(component).toMatchSnapshot();
});
