import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter as Router} from 'react-router-dom';

import {Provider} from "react-redux";
import {createStore} from "redux";

import {loadedStore} from "../../mocks/store.js";
import {createNodeMock} from "../../mocks/node-mock.js";
import CatalogLikeThis from "../catalog-like-this/catalog-like-this.jsx";


it(`Render correctly CatalogLikeThis component`, () => {
  const store = createStore(() => loadedStore);
  const component = renderer
    .create(
        <Provider store={store}>
          <Router>
            <CatalogLikeThis curFilmID={1}/>
          </Router>
        </Provider>,
        {
          createNodeMock
        }
    ).toJSON();

  expect(component).toMatchSnapshot();
});
