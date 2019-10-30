// import React from "react";
// import Enzyme, {mount} from "enzyme";
// import Adapter from "enzyme-adapter-react-16";
// import VideoPlayer from "./video-player.jsx";
//
// Enzyme.configure({adapter: new Adapter()});

window.HTMLMediaElement.prototype.play = () => {};

it(`Should have pause and playing state`, () => {
  // const component = mount(
  //     <VideoPlayer
  //       isPlaying={false}
  //       src={`https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`}
  //       muted={true}
  //     />
  // );
  // expect(component.state(`isPlaying`)).toEqual(false);
  // component.setState({isLoading: false});
  // component.setProps({isPlaying: true});
  // expect(component.state(`isPlaying`)).toEqual(true);
});
