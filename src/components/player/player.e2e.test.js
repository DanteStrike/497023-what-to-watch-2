import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Player} from "./player.jsx";

Enzyme.configure({adapter: new Adapter()});

describe(`Component Player should work correctly`, () => {
  let component;
  const toggleFullScreenMock = jest.fn();
  const closeVideoPlayerMock = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    component = mount(
        <Player
          videoSrc="src"
          isActivePlayer={false}
          isFullScreen={false}
          toggleFullScreen={toggleFullScreenMock}
          updateProgressBar={jest.fn()}
          renderProgressBar={jest.fn()}
          renderPlayButton={jest.fn()}
          renderFullScreen={jest.fn()}
          closeVideoPlayer={closeVideoPlayerMock}
        />
    );
  });

  it(`Should toggle fullScreen on isFullScreen change`, () => {
    expect(toggleFullScreenMock).toBeCalledTimes(0);
    component.setProps({isFullScreen: true});
    expect(toggleFullScreenMock).toBeCalledTimes(1);
    expect(toggleFullScreenMock).toHaveBeenLastCalledWith(component.find(`.player`).getDOMNode());
  });

  it(`Should closeVideoPlayer on button click`, () => {
    expect(closeVideoPlayerMock).toBeCalledTimes(0);
    component.find(`.player__exit`).simulate(`click`);
    expect(closeVideoPlayerMock).toBeCalledTimes(1);
  });
});
