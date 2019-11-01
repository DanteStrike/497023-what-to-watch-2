import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import VideoPlayer from "./video-player.jsx";

Enzyme.configure({adapter: new Adapter()});


//  jsdom doesn't support any loading or playback media operation
HTMLVideoElement.prototype.play = function () {
  this.dispatchEvent(new Event(`play`));
};

HTMLVideoElement.prototype.pause = function () {
  this.dispatchEvent(new Event(`pause`));
};

HTMLVideoElement.prototype.load = function () {
  this.dispatchEvent(new Event(`load`));
};

describe(`VideoPlayer state`, () => {
  it(`Should play on isPlaying = true`, () => {
    const component = mount(
        <VideoPlayer
          poster={`img/johnny-english.jpg`}
          isPlaying={false}
          src={`https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`}
          isMuted={true}
        />
    );
    const video = component.find(`video`).getDOMNode();
    const spyVideoPlay = jest.spyOn(video, `play`);
    const spyVideoPause = jest.spyOn(video, `pause`);

    component.setProps({isPlaying: true});
    expect(spyVideoPause).toBeCalledTimes(0);
    expect(spyVideoPlay).toBeCalledTimes(1);
  });

  it(`Should pause on isPlaying = false`, () => {
    const component = mount(
        <VideoPlayer
          poster={`img/johnny-english.jpg`}
          isPlaying={true}
          src={`https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`}
          isMuted={true}
        />
    );
    const video = component.find(`video`).getDOMNode();
    const spyVideoPlay = jest.spyOn(video, `play`);
    const spyVideoPause = jest.spyOn(video, `pause`);

    component.setProps({isPlaying: false});
    expect(spyVideoPlay).toBeCalledTimes(0);
    expect(spyVideoPause).toBeCalledTimes(1);
  });
});
