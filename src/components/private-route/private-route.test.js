import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";
import {PrivateRoute} from "./private-route";

it(`Component PrivateRouter should render correctly`, () => {
  const MockComponent = () => <div/>;

  const component = renderer.create(
      <BrowserRouter>
        <PrivateRoute component={MockComponent} isAuth={true}/>
      </BrowserRouter>
  ).toJSON();

  expect(component).toMatchSnapshot();
});
