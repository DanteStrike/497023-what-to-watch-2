import React from "react";
import renderer from "react-test-renderer";
import {films} from "../../mocks/films.js";
import App from "./app.jsx";
import {Provider} from "react-redux";
import {createStore} from "redux";

const store = createStore(() => ({
  filterGenre: `All genre`,
  filteredFilms: []
}));

it(`render correctly App component`, () => {
  const component = renderer
    .create(
        <Provider store={store}>
          <App
            films={films}
          />
        </Provider>,
        {
          createNodeMock: (element) => {
            if (element.type === `video`) {
              return {
                src: null,
                isMuted: null,
                poster: null
              };
            }
            return null;
          }
        }
    ).toJSON();

  expect(component).toMatchSnapshot();
});
