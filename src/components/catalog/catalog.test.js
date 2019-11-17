import React from "react";
import renderer from "react-test-renderer";

import {createStore} from "redux";
import {Provider} from "react-redux";

import {initStore} from "../../mocks/store.js";
import {createNodeMock} from "../../mocks/node-mock.js";
import Catalog from "./catalog.jsx";


it(`Render correctly Catalog component`, () => {
  const store = createStore(() => initStore);
  const component = renderer
    .create(
        <Provider store={store}>
          <Catalog/>
        </Provider>,
        {
          createNodeMock
        }
    ).toJSON();

  expect(component).toMatchSnapshot();
});
