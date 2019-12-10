import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withTimer from "./with-timer.jsx";

Enzyme.configure({adapter: new Adapter()});

describe(`HoC withTimer should work correctly`, () => {
  let component;
  const MockComponent = () => <div/>;
  const MockComponentWrapped = withTimer(500)(MockComponent);

  beforeEach(() => {
    jest.useFakeTimers();
    component = shallow(<MockComponentWrapped/>);
  });

  it(`Timer should be inactive by default`, () => {
    expect(component.state().timerID).toBeNull();
    expect(component.state().isTimerFinished).toEqual(false);
  });

  it(`Timer timeout should be set from argument timeout`, () => {
    expect(component.instance()._timeout).toBe(500);
  });

  it(`Timer should start on timer start handler`, () => {
    component.instance()._handleTimerStart();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(component.instance()._timerFinished, 500);
    expect(component.state().timerID).not.toBeNull();
    expect(component.state().isTimerFinished).toEqual(false);
  });

  it(`Timer should reset on timer reset handler`, () => {
    component.instance()._handleTimerReset();
    expect(clearTimeout).toHaveBeenCalledTimes(1);
    expect(component.state().timerID).toBeNull();
    expect(component.state().isTimerFinished).toEqual(false);
  });

  it(`Timer should sent signal on timer finished`, () => {
    component.instance()._handleTimerStart();
    jest.runAllTimers();
    expect(component.state().isTimerFinished).toEqual(true);
  });

  it(`Should correctly unmount`, () => {
    const reset = component.instance()._handleTimerReset = jest.fn();
    component.unmount();
    expect(reset).toHaveBeenCalledTimes(1);
  });
});
