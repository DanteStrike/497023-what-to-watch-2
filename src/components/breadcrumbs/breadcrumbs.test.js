import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter as Router} from "react-router-dom";
import Breadcrumbs from "./breadcrumbs";


it(`Render correctly Breadcrumbs component`, () => {
  const component = renderer
    .create(
        <Router>
          <Breadcrumbs curFilmID={1} name={`any`}/>
        </Router>
    ).toJSON();

  expect(component).toMatchSnapshot();
});
