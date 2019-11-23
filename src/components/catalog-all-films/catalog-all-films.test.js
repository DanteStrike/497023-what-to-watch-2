import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter as Router} from 'react-router-dom';

import {Provider} from "react-redux";
import {createStore} from "redux";

import {initStore} from "../../mocks/store.js";
import {createNodeMock} from "../../mocks/node-mock.js";
import CatalogAllFilms from "./catalog-all-films";


it(`Render correctly CatalogLikeThis component`, () => {
  const store = createStore(() => initStore);
  const component = renderer
    .create(
        <Provider store={store}>
          <Router>
            <CatalogAllFilms/>
          </Router>
        </Provider>,
        {
          createNodeMock
        }
    ).toJSON();

  expect(component).toMatchSnapshot();
});
