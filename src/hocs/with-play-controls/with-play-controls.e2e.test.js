import React from "react";
import Enzyme, {mount, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withPlayControls from "./with-play-controls";

Enzyme.configure({adapter: new Adapter()});

describe(`HoC withPlayControls should work correctly`, () => {
  let component;

  const MockComponent = () => (<div/>);
  const MockComponentWrapped = withPlayControls(MockComponent);

  beforeEach(() => {
    component = shallow(<MockComponentWrapped/>);
  });

  it(`Should init state correctly`, () => {
    expect(component.state().isPlaying).toEqual(false);
  });

  it(`Should render play button on default`, () => {
    const renderedComponent = mount(component.instance()._renderPlayButton());
    expect(renderedComponent.find(`use`).props().xlinkHref).toEqual(`#play-s`);
  });

  it(`Should render pause button on playing`, () => {
    component.setState({isPlaying: true});
    const renderedComponent = mount(component.instance()._renderPlayButton());
    expect(renderedComponent.find(`use`).props().xlinkHref).toEqual(`#pause`);
  });

  it(`Should change playing state on button click`, () => {
    component.instance()._handlePlayButtonClick();
    expect(component.state().isPlaying).toEqual(true);
    component.instance()._handlePlayButtonClick();
    expect(component.state().isPlaying).toEqual(false);
  });
});
