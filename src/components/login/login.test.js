import React from "react";
import renderer from "react-test-renderer";
import Login from "./login";
import {BrowserRouter as Router} from "react-router-dom";

it(`Component Login should render correctly`, () => {
  const component = renderer.create(
      <Router>
        <Login
          email={`email`}
          emailValidation={{
            isValid: true,
            msg: ``
          }}
          validateEmail={jest.fn()}
          onEmailChange={jest.fn()}
          password={`password`}
          passwordValidation={{
            isValid: true,
            msg: ``
          }}
          validatePassword={jest.fn()}
          onPasswordChange={jest.fn()}
          requestLogin={jest.fn()}
          toggleFormLock={jest.fn()}
          isSubmitting={false}
          serverError={{
            isError: false,
            target: ``,
            msg: ``
          }}
          resetEmailValidation={jest.fn()}
          resetPasswordValidation={jest.fn()}
        />
      </Router>
  );

  expect(component).toMatchSnapshot();
});
