import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter as Router} from 'react-router-dom';
import {AddReviewPage} from "./add-review-page";
import {films} from "../../mocks/films";
import {createStore} from "redux";
import {loadedStore} from "../../mocks/store";
import {Provider} from "react-redux";


it(`Render correctly AddReviewPage component`, () => {
  const store = createStore(() => loadedStore);
  const component = renderer
    .create(
        <Provider store={store}>
          <Router>
            <AddReviewPage
              curFilmID={3}
              film={films[1]}
              history={{
                push: jest.fn()
              }}
              postComment={jest.fn()}
              resetPostCommentError={jest.fn()}
              isSuccess={false}
              serverError={{
                isError: false,
                msg: ``
              }}
            />
          </Router>
        </Provider>
    ).toJSON();

  expect(component).toMatchSnapshot();
});
