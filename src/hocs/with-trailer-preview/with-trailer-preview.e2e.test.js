import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withTrailerPreview from "./with-trailer-preview";

Enzyme.configure({adapter: new Adapter()});

describe(`HoC withTrailerPreview should work correctly`, () => {
  let component;
  const MockComponent = () => <div/>;
  const MockComponentWrapped = withTrailerPreview(MockComponent);

  beforeEach(() => {
    component = shallow(
        <MockComponentWrapped
          poster={`test.jpg`}
          isActivePlayer={false}
          isMuted={false}
          previewSrc={`test.mp4`}
          isTimerFinished={false}
        />
    );
  });

  it(`Should render VideoPlayer component`, () => {
    const renderedComponent = component.instance()._renderTrailerPreview();

    expect(renderedComponent.type.name).toEqual(`VideoPlayer`);
    expect(renderedComponent.props.poster).toEqual(`test.jpg`);
    expect(renderedComponent.props.isActivePlayer).toEqual(false);
    expect(renderedComponent.props.isMuted).toEqual(false);
    expect(renderedComponent.props.src).toEqual(`test.mp4`);
  });

  it(`Trailer should be paused by default`, () => {
    expect(component.state().isActivePlayer).toEqual(false);
  });

  it(`Trailer should be show according to signal from the timer`, () => {
    component.setProps({isTimerFinished: true});
    expect(component.state().isActivePlayer).toEqual(true);
  });
});
