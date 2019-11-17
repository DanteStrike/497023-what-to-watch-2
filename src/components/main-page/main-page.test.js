import React from "react";
import renderer from "react-test-renderer";

import {Provider} from "react-redux";
import {createStore} from "redux";

import {initStore} from "../../mocks/store.js";
import {createNodeMock} from "../../mocks/node-mock.js";
import MainPage from "./main-page.jsx";


it(`Render correctly MainPage component`, () => {
  const store = createStore(() => initStore);
  const component = renderer
    .create(
        <Provider store={store}>
          <MainPage/>
        </Provider>,
        {
          createNodeMock
        }
    ).toJSON();

  expect(component).toMatchSnapshot();
});
