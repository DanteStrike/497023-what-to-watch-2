import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import {App} from "./app.jsx";

Enzyme.configure({adapter: new Adapter()});

describe(`Component APP should work correctly`, () => {
  it(`Should render Player on videoPlayerOpen event`, () => {
    const component = shallow(
        <App
          isAppReady={true}
          videoPlayerID={-1}
        />
    );

    expect(component.find(`Connect(Player)`)).toHaveLength(0);
    component.setProps({videoPlayerID: 222});
    expect(component.find(`Connect(Player)`)).toHaveLength(1);
  });
});
