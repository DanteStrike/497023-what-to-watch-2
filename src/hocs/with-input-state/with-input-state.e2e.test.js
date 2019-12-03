import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withInputState from "./with-input-state";

Enzyme.configure({adapter: new Adapter()});

describe(`HoC withInputState should work correctly`, () => {
  let component;
  const MockComponent = () => <div/>;
  const MockComponentWrapped = withInputState(`email`, `onEmailChange`, ``)(MockComponent);

  beforeEach(() => {
    component = shallow(
        <MockComponentWrapped/>
    );
  });

  it(``, () => {
  });
});
