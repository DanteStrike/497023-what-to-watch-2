import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter as Router} from 'react-router-dom';
import {MoviePreview} from "./movie-preview.jsx";
import {createStore} from "redux";
import {loadedStore} from "../../mocks/store";
import {Provider} from "react-redux";


it(`Render correctly MoviePreview component`, () => {
  const promoMock = {
    id: 1,
    name: `any`,
    genre: `any`,
    posterImage: `url`,
    background: {
      color: `#FFF`,
      image: `url`,
    },
    released: 9999
  };

  const store = createStore(() => loadedStore);
  store.dispatch = jest.fn();
  const MoviePreviewComponent = renderer
    .create(
        <Provider store={store}>
          <Router>
            <MoviePreview
              promo={promoMock}
            />
          </Router>
        </Provider>
    ).toJSON();

  expect(MoviePreviewComponent).toMatchSnapshot();
});
