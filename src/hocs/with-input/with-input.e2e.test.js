import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withInput from "./with-input.jsx";

Enzyme.configure({adapter: new Adapter()});

describe(`HoC withInput should work correctly`, () => {
  let component;

  const MockComponent = () => <div/>;
  const MockComponentWrapped = withInput(
      `email`,
      `onEmailChange`,
      `any`
  )(MockComponent);

  beforeEach(() => {
    jest.resetAllMocks();
    component = shallow(
        <MockComponentWrapped/>
    );
  });

  it(`Should iniState correctly`, () => {
    expect(component.state()).toEqual({
      email: `any`
    });
  });

  it(`Should change state onChangeInput`, () => {
    component.instance()._changeInputState(`newAny`);
    expect(component.state().email).toEqual(`newAny`);
  });
});
