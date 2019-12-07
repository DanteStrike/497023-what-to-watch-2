import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {SignInPage} from "./sign-in-page.jsx";
import axios from "axios";

Enzyme.configure({adapter: new Adapter()});

describe(`SignInPage should work correctly`, () => {
  let component;
  const historyMock = {
    push: jest.fn()
  };
  const locationMock = {
    state: {
      referrer: `/other`
    }
  };
  const serverErrorMock = {
    isError: false,
    target: ``,
    msg: ``
  };
  const sentAuthRequestMock = jest.fn();
  const resetAuthErrorsMock = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();

    component = shallow(
        <SignInPage
          isAuth={false}
          serverError={serverErrorMock}
          sentAuthRequest={sentAuthRequestMock}
          resetAuthErrors={resetAuthErrorsMock}
          history={historyMock}
          location={locationMock}
        />
    );
  });

  it(`Should reset prev error state in store on unmount`, () => {
    expect(resetAuthErrorsMock).toHaveBeenCalledTimes(0);
    component.unmount();
    expect(resetAuthErrorsMock).toHaveBeenCalledTimes(1);
  });

  it(`Should redirect to main page on default`, () => {
    component.setProps({location: {state: undefined}});
    component.setProps({isAuth: true});
    expect(historyMock.push).toHaveBeenCalledTimes(1);
    expect(historyMock.push).toHaveBeenLastCalledWith(`/`);
  });

  it(`Should redirect user back to private page`, () => {
    component.setProps({isAuth: true});
    expect(historyMock.push).toHaveBeenCalledTimes(1);
    expect(historyMock.push).toHaveBeenLastCalledWith(`/other`);
  });

  it(`Should redirect only on isAuth change false -> true`, () => {
    component.setProps({isAuth: true});
    jest.resetAllMocks();
    expect(historyMock.push).not.toHaveBeenCalled();
    component.setProps({isAuth: false});
    expect(historyMock.push).not.toHaveBeenCalled();
    component.setProps({isAuth: true});
    expect(historyMock.push).toHaveBeenCalled();
  });

  it(`Should cancel request on user change page`, () => {
    const authRequestToken = component.instance().authRequestToken = {
      cancel: jest.fn()
    };

    component.unmount();
    expect(authRequestToken.cancel).toHaveBeenCalled();
  });

  it(`Should auth request correctly`, () => {
    jest.resetAllMocks();
    jest.spyOn(axios.CancelToken, `source`).mockImplementation(() => `cancelToken`);
    component.instance()._requestAuthHandler(`email`, `password`);
    expect(resetAuthErrorsMock).toHaveBeenCalledTimes(1);
    expect(sentAuthRequestMock).toHaveBeenCalledTimes(1);
    expect(sentAuthRequestMock).toHaveBeenLastCalledWith(`email`, `password`, `cancelToken`);
  });
});
