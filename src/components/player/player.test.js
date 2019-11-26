import React from "react";
import renderer from "react-test-renderer";
import {Player} from "./player.jsx";


it(`Render correctly Player component`, () => {
  const component = renderer
    .create(
        <Player
          poster={`image`}
          src={`source`}
          preload={`none`}
          renderTimeBar={jest.fn()}
          renderPlayButton={jest.fn()}
          renderFullScreenButton={jest.fn()}
          closeVideoPlayer={jest.fn()}
          video={{
            poster: `image`,
            src: `url`
          }}
        />
    ).toJSON();

  expect(component).toMatchSnapshot();
});
