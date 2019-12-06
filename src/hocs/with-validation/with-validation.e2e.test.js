import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withValidation from "./with-validation.jsx";

Enzyme.configure({adapter: new Adapter()});

describe(`HoC withValidation should work correctly`, () => {
  let component;
  const validationFn = jest.fn();

  const MockComponent = () => <div/>;
  const MockComponentWrapped = withValidation(
      `email`,
      `validateEmail`,
      `emailValidation`,
      `resetEmailValidation`,
      validationFn
  )(MockComponent);

  beforeEach(() => {
    jest.resetAllMocks();
    component = shallow(
        <MockComponentWrapped email="email"/>
    );
  });

  it(`Should iniState correctly`, () => {
    expect(component.state()).toEqual({
      emailValidation: {
        isValid: true,
        msg: ``
      }
    });
  });

  it(`Should call validationFn correctly`, () => {
    validationFn.mockReturnValue({
      isValid: true,
      msg: `any`
    });
    component.instance()._validateInputValue();
    expect(validationFn).toHaveBeenCalledTimes(1);
    expect(validationFn).toHaveBeenLastCalledWith(`email`);
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
      emailValidation: {
        isValid: true,
        msg: `any`
      }
    });
  });

  it(`Should reset validation correctly`, () => {
    component.setState({
      emailValidation: {
        isValid: false,
        msg: `error msg`
      }
    });

    component.instance()._resetValidation();
    expect(component.state()).toEqual({
      emailValidation: {
        isValid: true,
        msg: ``
      }
    });
  });
});
