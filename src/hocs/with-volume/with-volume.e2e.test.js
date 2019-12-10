import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withVolume from "./with-volume.jsx";

Enzyme.configure({adapter: new Adapter()});

describe(`HoC withVolume should work correctly`, () => {
  let component;

  const MockComponent = () => <div/>;
  const MockComponentWrapped = withVolume({
    defaultValue: 20,
    step: 5,
    minVolume: 0,
    maxVolume: 100
  })(MockComponent);

  beforeEach(() => {
    jest.resetAllMocks();
    component = shallow(<MockComponentWrapped/>);
  });

  it(`Should iniState correctly`, () => {
    expect(component.state()).toEqual({
      value: 20
    });
  });

  it(`Should updateVolume correctly`, () => {
    component.instance()._updateVolume(false);
    expect(component.state().value).toBe(15);
    component.instance()._updateVolume(true);
    expect(component.state().value).toBe(20);
    component.setState({value: 0});
    component.instance()._updateVolume(false);
    expect(component.state().value).toBe(0);
    component.setState({value: 100});
    component.instance()._updateVolume(true);
    expect(component.state().value).toBe(100);
  });

  it(`Should scale volume correctly`, () => {
    expect(component.props().volume).toBe(0.2);
  });
});
