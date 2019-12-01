import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withValidation from "./with-validation";
import {LoginValidationType} from "../../utils/enum";

Enzyme.configure({adapter: new Adapter()});

describe(`HoC withLogin should work correctly`, () => {
  let component;
  let validateEmailMock;
  let validatePasswordMock;
  const onRequestAuthMock = jest.fn();

  const evtInputMock = {
    target: {
      value: `any`
    }
  };

  const MockComponent = () => (<div/>);
  const MockComponentWrapped = withValidation(MockComponent);

  beforeEach(() => {
    jest.resetAllMocks();
    component = shallow(
        <MockComponentWrapped
          onRequestAuth={onRequestAuthMock}
          serverErrorMsg={``}
        />
    );

    validateEmailMock = jest.spyOn(component.instance(), `_validateEmail`);
    validatePasswordMock = jest.spyOn(component.instance(), `_validatePassword`);
  });

  it(`Should have default state`, () => {
    component.state().email = ``;
    component.state().password = ``;
    component.state().validation = {
      showError: false,
      msg: ``
    };
    component.state().isSubmitting = false;
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
    validateEmailMock.mockReturnValue(true);
    validatePasswordMock.mockReturnValue(true);

    component.instance()._formSubmitHandler();
    expect(component.instance()._validateEmail).toBeCalledTimes(1);
    expect(component.instance()._validatePassword).toBeCalledTimes(1);
    jest.resetAllMocks();

    component.instance()._formSubmitHandler();
    validateEmailMock.mockReturnValue(false);
    validatePasswordMock.mockReturnValue(true);
    expect(component.instance()._validateEmail).toBeCalledTimes(1);
    expect(component.instance()._validatePassword).toBeCalledTimes(0);
  });

  it(`Should call onRequestAuth on validation success`, () => {
    validateEmailMock.mockReturnValue(true);
    validatePasswordMock.mockReturnValue(true);

    component.setState({
      email: `email`,
      password: `password`,
    });

    component.instance()._formSubmitHandler();
    expect(onRequestAuthMock).toHaveBeenCalledTimes(1);
    expect(onRequestAuthMock).toHaveBeenLastCalledWith(`email`, `password`);
  });

  it(`Should lock form on submitting and unlock on server error`, () => {
    validateEmailMock.mockReturnValue(true);
    validatePasswordMock.mockReturnValue(true);
    component.instance()._formSubmitHandler();
    expect(component.state().isSubmitting).toEqual(true);

    component.setProps({serverErrorMsg: `any`});
    expect(component.state().isSubmitting).toEqual(false);
    expect(component.state().validation).toEqual({
      showError: true,
      type: ``,
      msg: `Server: any`
    });
  });

  it(`Should validate email correctly`, () => {
    component.instance()._validateEmail();

    expect(component.state().validation).toEqual({
      showError: true,
      type: LoginValidationType.EMAIL,
      msg: `Form: Please enter email address`
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
      msg: `Form: Please enter a valid email address`
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
    component.instance()._validatePassword();

    expect(component.state().validation).toEqual({
      showError: true,
      type: LoginValidationType.PASSWORD,
      msg: `Form: Please enter password`
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
