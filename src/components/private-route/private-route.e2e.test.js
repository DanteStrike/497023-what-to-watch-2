import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {BrowserRouter as Router} from "react-router-dom";

import {PrivateRoute} from "./private-route";

Enzyme.configure({adapter: new Adapter()});

describe(`Component PrivateRoute should work correctly`, () => {
  it(`Should redirect`, () => {
    const locationMock = {
      pathname: `/other`
    };
    const MockComponent = () => <div/>;

    const component = mount(
        <Router>
          <PrivateRoute isAuth={false} component={MockComponent} location={locationMock}/>
        </Router>
    );

    expect(component.find(`Redirect`)).toHaveLength(1);
  });
});
