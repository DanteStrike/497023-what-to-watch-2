import {closeFullscreen, openFullScreen} from "./fullscreen-api";

describe(`Util fullscreenAPI should work correctly`, () => {
  const elementDefault = {
    requestFullscreen: jest.fn(),
    exitFullscreen: jest.fn()
  };

  const elementFirefox = {
    mozRequestFullScreen: jest.fn(),
    mozCancelFullScreen: jest.fn()
  };

  const elementWebkit = {
    webkitRequestFullscreen: jest.fn(),
    webkitExitFullscreen: jest.fn()
  };

  const elementIeAndEdge = {
    msRequestFullscreen: jest.fn(),
    msExitFullscreen: jest.fn()
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it(`Util openFullScreen`, () => {
    openFullScreen(elementDefault);
    expect(elementDefault.requestFullscreen).toHaveBeenCalledTimes(1);
    openFullScreen(elementFirefox);
    expect(elementFirefox.mozRequestFullScreen).toHaveBeenCalledTimes(1);
    openFullScreen(elementWebkit);
    expect(elementWebkit.webkitRequestFullscreen).toHaveBeenCalledTimes(1);
    openFullScreen(elementIeAndEdge);
    expect(elementIeAndEdge.msRequestFullscreen).toHaveBeenCalledTimes(1);
  });

  it(`Util closeFullScreen`, () => {
    global.document.msExitFullscreen = jest.fn();
    closeFullscreen();
    expect(global.document.msExitFullscreen).toHaveBeenCalledTimes(1);

    global.document.webkitExitFullscreen = jest.fn();
    closeFullscreen();
    expect(global.document.webkitExitFullscreen).toHaveBeenCalledTimes(1);

    global.document.mozCancelFullScreen = jest.fn();
    closeFullscreen();
    expect(global.document.mozCancelFullScreen).toHaveBeenCalledTimes(1);

    global.document.exitFullscreen = jest.fn();
    closeFullscreen();
    expect(global.document.exitFullscreen).toHaveBeenCalledTimes(1);
  });
});
