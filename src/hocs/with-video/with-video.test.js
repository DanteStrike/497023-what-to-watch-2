import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withVideo from "./with-video.jsx";

Enzyme.configure({adapter: new Adapter()});

describe(``, () => {
  let component;
  const MockComponent = () => <div/>;
  const MockComponentWrapped = withVideo(MockComponent);

  beforeEach(() => {
    component = shallow(
        <MockComponentWrapped
          poster={`test.jpg`}
          videoSrc={`url`}
        />
    );
  });

  it(``, () => {
  });

  it(``, () => {
  });

  it(``, () => {
  });
});
