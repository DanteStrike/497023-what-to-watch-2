import React from "react";
import Enzyme, {mount, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withFullScreen from "./with-full-screen";
import * as fullScreenApi from "../../utils/fullscreen-api/fullscreen-api.js";

Enzyme.configure({adapter: new Adapter()});

describe(`HoC withFullScreen should work correctly`, () => {
  let component;

  const MockComponent = () => (<div/>);
  const MockComponentWrapped = withFullScreen(MockComponent);

  beforeEach(() => {
    component = shallow(<MockComponentWrapped/>);
  });

  it(`Should init state correctly`, () => {
    expect(component.state().isFullScreen).toEqual(false);
  });

  it(`Should render fullscreen button`, () => {
    const renderedComponent = mount(component.instance()._renderFullScreen());
    expect(renderedComponent.find(`use`).props().xlinkHref).toEqual(`#full-screen`);
  });

  it(`Should change fullscreen state on button click`, () => {
    component.instance()._fullScreenButtonClickHandler();
    expect(component.state().isFullScreen).toEqual(true);
    component.instance()._fullScreenButtonClickHandler();
    expect(component.state().isFullScreen).toEqual(false);
  });

  it(`Should toggle fullscreen`, () => {
    const openSpy = jest.spyOn(fullScreenApi, `openFullScreen`).mockImplementation(() => {});
    const closeSpy = jest.spyOn(fullScreenApi, `closeFullscreen`).mockImplementation(() => {});

    component.instance()._toggleFullScreen();
    expect(openSpy).toBeCalledTimes(0);
    expect(closeSpy).toBeCalledTimes(1);
    component.setState({isFullScreen: true});
    component.instance()._toggleFullScreen();
    expect(openSpy).toBeCalledTimes(1);
    expect(closeSpy).toBeCalledTimes(1);
  });
});
