import React from "react";
import renderer from "react-test-renderer";

import {createNodeMock} from "../../mocks/node-mock.js";
import VideoPlayer from "./video-player.jsx";


it(`Render correctly VideoPlayer component`, () => {
  const VideoPlayerComponent = renderer
    .create(
        <VideoPlayer
          isActivePlayer={false}
          src={`https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`}
          poster={`img/johnny-english.jpg`}
          isMuted={true}
        />,
        {
          createNodeMock
        }
    ).toJSON();

  expect(VideoPlayerComponent).toMatchSnapshot();
});
