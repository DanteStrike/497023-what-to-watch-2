import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {films as filmsMock} from "./mocks/films.js";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {reducer} from "./reducer/reducer.js";

const init = (films) => {
  const store = createStore(reducer);

  ReactDOM.render(
      <Provider store={store}>
        <App
          films={films}
        />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init(filmsMock);

