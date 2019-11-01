import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import VideoPlayer from "./video-player.jsx";

Enzyme.configure({adapter: new Adapter()});


//  jsdom doesn't support any loading or playback media operation
window.HTMLMediaElement.prototype.play = function () {
  this.dispatchEvent(new Event(`play`));
};

window.HTMLMediaElement.prototype.pause = function () {
  this.dispatchEvent(new Event(`pause`));
};

window.HTMLMediaElement.prototype.load = function () {
  this.dispatchEvent(new Event(`load`));
};

it(`Should have pause and playing state`, () => {
  const component = mount(
      <VideoPlayer
        poster={`img/johnny-english.jpg`}
        isPlaying={false}
        src={`https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`}
        isMuted={true}
      />
  );

  expect(component.state(`isPlaying`)).toEqual(false);

  component.setProps({isPlaying: true});
  expect(component.state(`isPlaying`)).toEqual(true);

  component.setProps({isPlaying: false});
  expect(component.state(`isPlaying`)).toEqual(false);
});
