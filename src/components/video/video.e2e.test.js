import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Video from "./video.jsx";

Enzyme.configure({adapter: new Adapter()});

describe(`Component Video should work correctly`, () => {
  let component;
  const updateProgressBarMock = jest.fn();

  const refMock = {
    current: document.createElement(`video`)
  };

  refMock.current.play = jest.fn().mockResolvedValue(`default`);
  refMock.current.pause = jest.fn();
  refMock.current.load = jest.fn();

  const eventsMock = {};
  const addEventListenerMock = jest.fn((event, cb) => {
    eventsMock[event] = cb;
  });
  refMock.current.addEventListener = addEventListenerMock;

  const removeEventListenerMock = jest.fn((event) => {
    delete eventsMock[event];
  });
  refMock.current.removeEventListener = removeEventListenerMock;

  jest.spyOn(React, `createRef`).mockImplementation(() => refMock);

  beforeEach(() => {
    updateProgressBarMock.mockReset();

    component = shallow(
        <Video
          poster="any"
          src="url"
          isActivePlayer={false}
          isAutoReset={false}
          preload="auto"
          isMuted={true}
          updateProgressBar={updateProgressBarMock}
        />
    );
  });

  it(`Should correct add EventListener and remove EventListener`, () => {
    component.unmount();
    expect(addEventListenerMock).toBeCalledTimes(1);
    expect(removeEventListenerMock).toBeCalledTimes(1);
    expect(eventsMock).toEqual({});
  });

  it(`Should start play on isActivePlayer`, () => {
    expect(refMock.current.play).toBeCalledTimes(0);
    component.setProps({isActivePlayer: true});
    expect(refMock.current.play).toBeCalledTimes(1);
  });

  it(`Must paused on !isActivePlayer and play() promise resolved`, () => {
    component.instance()._resetVideo = jest.fn();

    expect(refMock.current.pause).toBeCalledTimes(0);
    component.setProps({isActivePlayer: true});
    expect(refMock.current.pause).toBeCalledTimes(0);
    expect(component.instance()._resetVideo).toBeCalledTimes(0);
    component.setProps({isActivePlayer: false});
    refMock.current.play()
      .then(() => {
        expect(refMock.current.pause).toBeCalledTimes(1);
        expect(component.instance()._resetVideo).toBeCalledTimes(1);
      });
  });

  it(`_resetVideo Should reset video on isAutoReset`, () => {
    refMock.current.currentTime = 1000;

    component.instance()._resetVideo();
    expect(refMock.current.currentTime).toBe(1000);
    expect(refMock.current.load).toBeCalledTimes(0);

    component.setProps({isAutoReset: true});
    component.instance()._resetVideo();
    expect(refMock.current.currentTime).toBe(0);
    expect(refMock.current.load).toBeCalledTimes(1);
  });

  it(`Should call updateProgressBar on timeupdate`, () => {
    expect(updateProgressBarMock).toBeCalledTimes(0);
    eventsMock[`timeupdate`]();
    expect(updateProgressBarMock).toBeCalledTimes(1);
  });
});
