import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withInputValidation from "./with-input-validation";

Enzyme.configure({adapter: new Adapter()});

describe(`HoC withInputValidation should work correctly`, () => {
  let component;
  const validationFn = jest.fn();

  const MockComponent = () => <div/>;
  const MockComponentWrapped = withInputValidation(
      `email`,
      `onEmailChange`,
      `any`,
      `validateEmail`,
      `emailValidation`,
      validationFn
  )(MockComponent);

  beforeEach(() => {
    jest.resetAllMocks();
    component = mount(
        <MockComponentWrapped/>
    );
  });

  it(`Should iniState correctly`, () => {
    expect(component.state()).toEqual({
      email: `any`,
      emailValidation: {
        isValid: true,
        msg: ``
      }
    });
  });

  it(`Should change state onChangeInput`, () => {
    component.instance()._changeInputState(`newAny`);
    expect(component.state().email).toEqual(`newAny`);
  });

  it(`Should validate correctly`, () => {
    let isValid;
    validationFn.mockReturnValue({
      isValid: false,
      msg: `error msg`
    });
    isValid = component.instance()._validateInputValue();
    expect(isValid).toEqual(false);
    expect(component.state()).toEqual({
      email: `any`,
      emailValidation: {
        isValid: false,
        msg: `error msg`
      }
    });

    validationFn.mockReturnValue({
      isValid: true,
      msg: `any`
    });
    isValid = component.instance()._validateInputValue();
    expect(isValid).toEqual(true);
    expect(component.state()).toEqual({
      email: `any`,
      emailValidation: {
        isValid: true,
        msg: `any`
      }
    });
  });

  it(`Should update validation state on input change (only if needed)`, () => {
    component.instance()._resetValidation = jest.fn();
    component.instance()._changeInputState();
    expect(component.instance()._resetValidation).toHaveBeenCalledTimes(0);

    component.setState({
      email: `any`,
      emailValidation: {
        isValid: false,
        msg: `error msg`
      }
    });
    component.instance()._changeInputState();
    expect(component.instance()._resetValidation).toHaveBeenCalledTimes(1);
  });

  it(`Should reset validation state correctly`, () => {
    component.setState({
      email: `any`,
      emailValidation: {
        isValid: false,
        msg: `error msg`
      }
    });

    component.instance()._resetValidation();
    expect(component.state()).toEqual({
      email: `any`,
      emailValidation: {
        isValid: true,
        msg: ``
      }
    });
  });

  it(`Should not crush if validateFn return wrong object`, () => {
    validationFn.mockReturnValue({});
    const isValid = component.instance()._validateInputValue();
    expect(isValid).toEqual(false);
    expect(component.state()).toEqual({
      email: `any`,
      emailValidation: {
        isValid: false,
        msg: ``
      }
    });
  });
});
