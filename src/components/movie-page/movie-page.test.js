import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter as Router} from "react-router-dom";
import MoviePage from "./movie-page.jsx";

import {loadedStore} from "../../mocks/store.js";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {commentsOperations} from "../../reducers/comments/index.js";


it(`Render correctly MoviePage component`, () => {
  const store = createStore(() => loadedStore);
  const component = renderer
    .create(
        <Provider store={store}>
          <Router>
            <MoviePage
              curFilmID={1}
            />
          </Router>
        </Provider>
    ).toJSON();

  expect(component).toMatchSnapshot();
});
