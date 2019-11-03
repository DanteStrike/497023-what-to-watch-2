import React from "react";
import renderer from "react-test-renderer";
import VideoPlayer from "./video-player.jsx";

it(`Render correctly VideoPlayer component`, () => {
  const VideoPlayerComponent = renderer
    .create(
        <VideoPlayer
          isPlaying={false}
          src={`https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`}
          poster={`img/johnny-english.jpg`}
          isMuted={true}
        />,
        {
          createNodeMock: (element) => {
            if (element.type === `video`) {
              return {
                src: null
              };
            }
            return null;
          }
        }
    ).toJSON();

  expect(VideoPlayerComponent).toMatchSnapshot();
});
