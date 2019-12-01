import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Login from "./login";

Enzyme.configure({adapter: new Adapter()});

describe(`Component Login should work correctly`, () => {
  let component;
  const preventDefault = jest.fn();
  const onFormSubmitMock = jest.fn();
  const onEmailChangeMock = jest.fn();
  const onPasswordChangeMock = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    component = shallow(
        <Login
          onFormSubmit={onFormSubmitMock}
          onEmailChange={onEmailChangeMock}
          onPasswordChange={onPasswordChangeMock}
          formValidation={{
            showError: false,
            type: ``,
            msg: ``
          }}
          isSubmitting={false}
        />
    );
  });

  it(`Submit should prevent`, () => {
    component.find(`.sign-in__form`).simulate(`submit`, {preventDefault});
    expect(preventDefault).toHaveBeenCalledTimes(1);
  });

  it(`Should callback onFormSubmit on _formSubmitHandler`, () => {
    component.find(`.sign-in__form`).simulate(`submit`, {preventDefault});
    expect(onFormSubmitMock).toHaveBeenCalledTimes(1);
  });

  it(`Should callback correctly`, () => {
    component.find(`#user-email`).simulate(`change`, {evt: `test`});
    expect(onEmailChangeMock).toHaveBeenCalledTimes(1);
    expect(onEmailChangeMock).toHaveBeenLastCalledWith({evt: `test`});

    component.find(`#user-password`).simulate(`change`, {evt: `test`});
    expect(onPasswordChangeMock).toHaveBeenCalledTimes(1);
    expect(onPasswordChangeMock).toHaveBeenLastCalledWith({evt: `test`});
  });

  it(`Should show msg on submitting`, () => {
    component.setProps({isSubmitting: true});
    expect(component.find(`.sign-in__message`)).toHaveLength(1);
  });
});
