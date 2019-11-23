import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter as Router} from "react-router-dom";
import MoviePage from "./movie-page.jsx";

import {loadedStore} from "../../mocks/store.js";
import {createStore} from "redux";
import {Provider} from "react-redux";


it(`Render correctly MoviePage component`, () => {
  const store = createStore(() => loadedStore);
  const matchMock = {
    params: {
      id: `1`
    }
  };
  const component = renderer
    .create(
        <Provider store={store}>
          <Router>
            <MoviePage
              match={matchMock}
            />
          </Router>
        </Provider>
    ).toJSON();

  expect(component).toMatchSnapshot();
});
