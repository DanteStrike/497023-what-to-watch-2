import React from "react";
import Enzyme, {mount, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withProgressBar from "./with-progress-bar.jsx";

Enzyme.configure({adapter: new Adapter()});

describe(`HoC withProgressBar should work correctly`, () => {
  let component;
  const mediaElementEventMock = {
    target: {
      currentTime: 100,
      duration: 1000
    }
  };

  const MockComponent = () => (<div/>);
  const MockComponentWrapped = withProgressBar(MockComponent);

  beforeEach(() => {
    component = shallow(<MockComponentWrapped/>);
  });

  it(`Should init state correctly`, () => {
    expect(component.state().barPercent).toBe(0);
    expect(component.state().time).toBe(0);
  });

  it(`Should render bar correctly on default`, () => {
    const renderedComponent = mount(component.instance()._renderProgressBar());
    expect(renderedComponent.find(`.player__progress`).props().value).toBe(0);
    expect(renderedComponent.find(`.player__toggler`).props().style.left).toEqual(`0%`);
    expect(renderedComponent.find(`.player__time-value`).props().children).toEqual(`00:00:00`);
  });

  it(`Should update state on updateProgressBar fired by mediaElement`, () => {
    component.instance()._updateProgressBar(mediaElementEventMock);
    expect(component.state().barPercent).toBe(10);
    expect(component.state().time).toBe(900);

    const renderedComponent = mount(component.instance()._renderProgressBar());
    expect(renderedComponent.find(`.player__progress`).props().value).toBe(10);
    expect(renderedComponent.find(`.player__toggler`).props().style.left).toEqual(`10%`);
    expect(renderedComponent.find(`.player__time-value`).props().children).toEqual(`00:15:00`);
  });
});
