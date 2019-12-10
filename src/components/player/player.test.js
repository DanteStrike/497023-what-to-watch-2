import React from "react";
import renderer from "react-test-renderer";
import {Player} from "./player.jsx";
import {createNodeMock} from "../../mocks/node-mock";


it(`Render correctly Player component`, () => {
  const component = renderer
    .create(
        <Player
          videoSrc="src"
          volume={0.1}
          isActivePlayer={false}
          isFullScreen={false}
          toggleFullScreen={jest.fn()}
          updateProgressBar={jest.fn()}
          renderProgressBar={jest.fn()}
          renderPlayButton={jest.fn()}
          renderFullScreen={jest.fn()}
          closeVideoPlayer={jest.fn()}
          renderVolume={jest.fn()}
          updateVolume={jest.fn()}
        />,
        {
          createNodeMock
        }
    ).toJSON();

  expect(component).toMatchSnapshot();
});
