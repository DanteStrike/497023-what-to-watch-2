import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withToggleState from "./with-toggle-state.jsx";

Enzyme.configure({adapter: new Adapter()});

describe(`HoC withToggleState should work correctly`, () => {
  let component;

  const MockComponent = () => <div/>;
  const MockComponentWrapped = withToggleState(
      `isSubmitting`,
      false,
      `toggleFormLock`
  )(MockComponent);

  beforeEach(() => {
    component = shallow(
        <MockComponentWrapped/>
    );
  });

  it(`Should set init state`, () => {
    expect(component.state()).toEqual({
      isSubmitting: false
    });
  });

  it(`Should toggle state`, () => {
    component.instance()._toggleState();
    expect(component.state()).toEqual({
      isSubmitting: true
    });
    component.instance()._toggleState();
    expect(component.state()).toEqual({
      isSubmitting: false
    });
  });
});
