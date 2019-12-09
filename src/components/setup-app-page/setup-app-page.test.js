import React from "react";
import renderer from "react-test-renderer";
import SetupAppPage from "./setup-app-page.jsx";


it(`Render correctly SetupAppErrorPage component`, () => {
  const setupAppErrorMock = {
    isError: true,
    code: 400,
    msg: `Any`,
  };
  const component = renderer
    .create(
        <SetupAppPage setupAppError={setupAppErrorMock} onRepeatSetupClick={jest.fn()}/>
    ).toJSON();

  expect(component).toMatchSnapshot();
});
