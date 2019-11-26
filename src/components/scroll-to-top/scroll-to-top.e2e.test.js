import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {ScrollToTop} from "./scroll-to-top.jsx";

Enzyme.configure({adapter: new Adapter()});

describe(`Component ScrollToTop should work correctly`, () => {
  it(`Should scroll window to top on redirect`, () => {
    global.scrollTo = jest.fn();
    const locationMock = {
      pathname: `any`
    };
    const component = shallow(
        <ScrollToTop location={locationMock}/>
    );

    const newLocationMock = {
      pathname: `other`
    };
    component.setProps({location: newLocationMock});
    expect(global.scrollTo).toHaveBeenCalledTimes(1);
    expect(global.scrollTo).toHaveBeenLastCalledWith(0, 0);
  });
});
