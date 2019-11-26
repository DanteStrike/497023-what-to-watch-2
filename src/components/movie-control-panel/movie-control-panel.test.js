import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter as Router} from "react-router-dom";
import {MovieControlPanel} from "./movie-control-panel.jsx";


it(`Render correctly MovieControlPanel component`, () => {
  const component = renderer
    .create(
        <Router>
          <MovieControlPanel
            id={0}
            name={`any`}
            genre={`any`}
            released={9999}
            openVideoPlayer={jest.fn()}
          />
        </Router>
    ).toJSON();

  expect(component).toMatchSnapshot();
});
