import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Login from "./login";

Enzyme.configure({adapter: new Adapter()});

describe(`Component Login should work correctly`, () => {
  let component;
  const preventDefault = jest.fn();
  const validateEmailMock = jest.fn();
  const onEmailChangeMock = jest.fn();
  const validatePasswordMock = jest.fn();
  const onPasswordChangeMock = jest.fn();
  const requestLoginMock = jest.fn();
  const toggleFormLockMock = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    component = shallow(
        <Login
          email={``}
          emailValidation={{
            isValid: true,
            msg: ``
          }}
          validateEmail={validateEmailMock}
          onEmailChange={onEmailChangeMock}
          password={``}
          passwordValidation={{
            isValid: true,
            msg: ``
          }}
          validatePassword={validatePasswordMock}
          onPasswordChange={onPasswordChangeMock}
          requestLogin={requestLoginMock}
          toggleFormLock={toggleFormLockMock}
          isSubmitting={false}
          serverError={{
            isError: false,
            target: ``,
            msg: ``
          }}
          resetEmailValidation={jest.fn()}
          resetPasswordValidation={jest.fn()}
        />
    );
  });

  it(`Should change inputs correctly`, () => {
    component.find(`#user-email`).simulate(`change`, {target: {value: `email`, id: `user-email`}});
    expect(onEmailChangeMock).toHaveBeenCalledTimes(1);
    expect(onEmailChangeMock).toHaveBeenLastCalledWith(`email`);

    component.find(`#user-password`).simulate(`change`, {target: {value: `password`, id: `user-password`}});
    expect(onPasswordChangeMock).toHaveBeenCalledTimes(1);
    expect(onPasswordChangeMock).toHaveBeenLastCalledWith(`password`);
  });

  describe(`Should submit form correctly`, () => {
    validatePasswordMock.mockReturnValue(false);
    it(`Should abort submit on invalid email`, () => {
      component.find(`.sign-in__form`).simulate(`submit`, {preventDefault});
      expect(preventDefault).toHaveBeenCalledTimes(1);
      expect(validateEmailMock).toHaveBeenCalledTimes(1);
      expect(validatePasswordMock).toHaveBeenCalledTimes(0);
      expect(toggleFormLockMock).toHaveBeenCalledTimes(0);
      expect(requestLoginMock).toHaveBeenCalledTimes(0);
    });

    it(`Should abort submit on invalid password`, () => {
      validateEmailMock.mockReturnValue(true);
      component.find(`.sign-in__form`).simulate(`submit`, {preventDefault});
      expect(validateEmailMock).toHaveBeenCalledTimes(1);
      expect(validatePasswordMock).toHaveBeenCalledTimes(1);
      expect(toggleFormLockMock).toHaveBeenCalledTimes(0);
      expect(requestLoginMock).toHaveBeenCalledTimes(0);
    });

    it(`Should lockForm and request on success validation`, () => {
      validateEmailMock.mockReturnValue(true);
      validatePasswordMock.mockReturnValue(true);
      component.find(`.sign-in__form`).simulate(`submit`, {preventDefault});
      expect(validateEmailMock).toHaveBeenCalledTimes(1);
      expect(validatePasswordMock).toHaveBeenCalledTimes(1);
      expect(toggleFormLockMock).toHaveBeenCalledTimes(1);
      expect(requestLoginMock).toHaveBeenCalledTimes(1);
    });
  });

  it(`Should unlockForm correctly`, () => {
    component.update();
    expect(toggleFormLockMock).toHaveBeenCalledTimes(0);
    component.setProps({isSubmitting: true});
    expect(toggleFormLockMock).toHaveBeenCalledTimes(0);
    component.setProps({serverError: {
      isError: true,
      target: `target`,
      msg: `msg`
    }});
    expect(toggleFormLockMock).toHaveBeenCalledTimes(1);
    component.update();
    expect(toggleFormLockMock).toHaveBeenCalledTimes(1);
    component.setProps({serverError: {
      isError: false,
      target: ``,
      msg: ``
    }});
    expect(toggleFormLockMock).toHaveBeenCalledTimes(1);
  });

  describe(`Should show warning msg`, () => {
    it(`Should show msg on submitting`, () => {
      component.setProps({isSubmitting: true});
      expect(component.find(`.sign-in__message`)).toHaveLength(1);
    });

    it(`Should show msg on error`, () => {
      component.setProps({serverError: {
        isError: true,
        target: `target`,
        msg: `msg`
      }});
      expect(component.find(`.sign-in__message`)).toHaveLength(1);
    });

    it(`Should show msg on invalid email`, () => {
      component.setProps({emailValidation: {
        isValid: false,
        msg: `msg`
      }});
      expect(component.find(`.sign-in__message`)).toHaveLength(1);
    });

    it(`Should show msg on invalid password`, () => {
      component.setProps({passwordValidation: {
        isValid: false,
        msg: `msg`
      }});
      expect(component.find(`.sign-in__message`)).toHaveLength(1);
    });
  });
});
