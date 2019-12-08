import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter as Router} from "react-router-dom";
import MyListPage from "./my-list-page.jsx";

import {Provider} from "react-redux";
import {createStore} from "redux";

import {loadedStore} from "../../mocks/store.js";
import {createNodeMock} from "../../mocks/node-mock";

it(`Render correctly MyListPage component`, () => {
  const store = createStore(() => loadedStore);
  const component = renderer
    .create(
        <Provider store={store}>
          <Router>
            <MyListPage/>
          </Router>
        </Provider>,
        {
          createNodeMock
        }
    ).toJSON();

  expect(component).toMatchSnapshot();
});
