import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withLogin from "./with-login";
import {LoginValidationType} from "../../utils/enum";

Enzyme.configure({adapter: new Adapter()});

describe(`HoC withLogin should work correctly`, () => {
  let component;

  const evtInputMock = {
    target: {
      value: `any`
    }
  };

  const MockComponent = () => (<div/>);
  const MockComponentWrapped = withLogin(MockComponent);

  beforeEach(() => {
    component = shallow(<MockComponentWrapped/>);
  });

  it(`Should have default state`, () => {
    component.state().email = ``;
    component.state().password = ``;
    component.state().validation = {
      showError: false,
      msg: ``
    };
  });

  it(`Should change email state on _emailChangeHandler`, () => {
    component.instance()._emailChangeHandler(evtInputMock);
    expect(component.state().email).toEqual(`any`);
  });

  it(`Should change password state on _passwordChangeHandler`, () => {
    component.instance()._passwordChangeHandler(evtInputMock);
    expect(component.state().password).toEqual(`any`);
  });

  it(`Should validate form on _formSubmitHandler`, () => {
    const validateEmail = component.instance()._validateEmail = jest.fn();
    validateEmail.mockReturnValue(true);
    const validatePassword = component.instance()._validatePassword = jest.fn();
    validatePassword.mockReturnValue(true);

    component.instance()._formSubmitHandler();
    expect(component.instance()._validateEmail).toBeCalledTimes(1);
    expect(component.instance()._validatePassword).toBeCalledTimes(1);
    jest.resetAllMocks();

    component.instance()._formSubmitHandler();
    validateEmail.mockReturnValue(false);
    validatePassword.mockReturnValue(true);
    expect(component.instance()._validateEmail).toBeCalledTimes(1);
    expect(component.instance()._validatePassword).toBeCalledTimes(0);
  });

  it(`Should validate email correctly`, () => {
    jest.spyOn(component.instance(), `_validateEmail`);
    component.instance()._validateEmail();

    expect(component.state().validation).toEqual({
      showError: true,
      type: LoginValidationType.EMAIL,
      msg: `Please enter a valid email address`
    });
    expect(component.instance()._validateEmail).lastReturnedWith(false);
    component.state().validation = {
      showError: false,
      type: ``,
      msg: ``
    };

    component.state().email = `teset@tsete`;
    component.instance()._validateEmail();
    expect(component.state().validation).toEqual({
      showError: true,
      type: LoginValidationType.EMAIL,
      msg: `Please enter a valid email address`
    });
    expect(component.instance()._validateEmail).lastReturnedWith(false);
    component.state().validation = {
      showError: false,
      type: ``,
      msg: ``
    };

    component.state().email = `teset@tsete.123`;
    component.instance()._validateEmail();
    expect(component.state().validation).toEqual({
      showError: false,
      type: ``,
      msg: ``
    });
    expect(component.instance()._validateEmail).lastReturnedWith(true);
  });

  it(`Should validate password correctly`, () => {
    jest.spyOn(component.instance(), `_validatePassword`);
    component.instance()._validatePassword();

    expect(component.state().validation).toEqual({
      showError: true,
      type: LoginValidationType.PASSWORD,
      msg: `Please enter password`
    });
    expect(component.instance()._validatePassword).lastReturnedWith(false);
    component.state().validation = {
      showError: false,
      type: ``,
      msg: ``
    };

    component.state().password = `1`;
    component.instance()._validatePassword();
    expect(component.state().validation).toEqual({
      showError: false,
      type: ``,
      msg: ``
    });
    expect(component.instance()._validatePassword).lastReturnedWith(true);
  });

  it(`Should reset validation correctly`, () => {
    component.state().validation = {
      showError: true,
      type: `ANY`,
      msg: `ANY`
    };
    component.instance()._emailChangeHandler(evtInputMock);
    expect(component.state().validation).toEqual({
      showError: false,
      type: ``,
      msg: ``
    });

    component.state().validation = {
      showError: true,
      type: ``,
      msg: `ANY`
    };
    component.instance()._passwordChangeHandler(evtInputMock);
    expect(component.state().validation).toEqual({
      showError: false,
      type: ``,
      msg: ``
    });
  });
});
