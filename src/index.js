import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import configuredStore from "./reducers/configure-store.js";

import App from "./components/app/app.jsx";
import ScrollToTop from "./components/scroll-to-top/scroll-to-top.jsx";
import {appOperations} from "./reducers/app/index.js";


const init = (store) => {
  store.dispatch(appOperations.setupApp());

  ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <ScrollToTop/>
          <App/>
        </BrowserRouter>
      </Provider>,
      document.querySelector(`#root`)
  );
};

init(configuredStore);

