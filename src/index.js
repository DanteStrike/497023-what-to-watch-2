import React from "react";
import ReactDOM from "react-dom";

import {applyMiddleware, createStore, combineReducers} from "redux";
import {Provider} from "react-redux";

import thunk from "redux-thunk";
import {compose} from "recompose";

import configureAPI from "./server/configure-API.js";

import {appReducer} from "./reducers/app/index.js";
import {filmsReducer} from "./reducers/films/index.js";
import {genreFilterReducer} from "./reducers/genre-filter";

import App from "./components/app/app.jsx";
import {appOperations} from "./reducers/app/index.js";


const init = () => {
  const api = configureAPI((...args) => store.dispatch(...args));

  const rootReducer = combineReducers({
    app: appReducer,
    films: filmsReducer,
    genreFilter: genreFilterReducer
  });

  const store = createStore(
      rootReducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
      )
  );

  store.dispatch(appOperations.setupApp());

  ReactDOM.render(
      <Provider store={store}>
        <App/>
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();

