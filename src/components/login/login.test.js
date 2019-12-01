import React from "react";
import renderer from "react-test-renderer";
import Login from "./login";
import {BrowserRouter as Router} from "react-router-dom";

it(`Component Login should render correctly`, () => {
  const component = renderer.create(
      <Router>
        <Login
          onFormSubmit={jest.fn()}
          onEmailChange={jest.fn()}
          onPasswordChange={jest.fn()}
          formValidation={{
            showError: false,
            type: ``,
            msg: ``
          }}
          isSubmitting={false}
        />
      </Router>
  );

  expect(component).toMatchSnapshot();
});
