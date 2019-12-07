import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter as Router} from "react-router-dom";
import MoviePage from "./movie-page.jsx";

import {loadedStore} from "../../mocks/store.js";
import {createStore} from "redux";
import {Provider} from "react-redux";

it(`Render correctly MoviePage component`, () => {
  const store = createStore(() => loadedStore);
  store.dispatch = jest.fn();

  const component = renderer
    .create(
        <Provider store={store}>
          <Router>
            <MoviePage
              curFilmID={1}
              renderTabs={jest.fn()}
              resetTabs={jest.fn()}
            />
          </Router>
        </Provider>
    ).toJSON();

  expect(component).toMatchSnapshot();
});
