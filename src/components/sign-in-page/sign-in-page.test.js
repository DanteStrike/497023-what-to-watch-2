import React from "react";
import renderer from "react-test-renderer";
import {SignInPage} from "./sign-in-page";
import {BrowserRouter as Router} from "react-router-dom";

it(`Component SignInPage should render correctly`, () => {
  const component = renderer.create(
      <Router>
        <SignInPage
          history={{
            push: jest.fn()
          }}
          location={{obj: `obj`}}
          isAuth={false}
          resetAuthErrors={jest.fn()}
          sentAuthRequest={jest.fn()}
          serverError={{
            isError: false,
            msg: ``}}
        />
      </Router>
  );

  expect(component).toMatchSnapshot();
});
