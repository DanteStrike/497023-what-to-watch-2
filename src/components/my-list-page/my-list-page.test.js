import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter as Router} from "react-router-dom";
import MyListPage from "./my-list-page.jsx";


it(`Render correctly MyListPage component`, () => {
  const component = renderer
    .create(
        <Router>
          <MyListPage/>
        </Router>
    ).toJSON();

  expect(component).toMatchSnapshot();
});
