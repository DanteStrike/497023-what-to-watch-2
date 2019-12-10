import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter as Router} from "react-router-dom";
import {MovieControlPanel} from "./movie-control-panel.jsx";


it(`Render correctly MovieControlPanel component`, () => {
  const component = renderer
    .create(
        <Router>
          <MovieControlPanel
            isAuth={true}
            isFavorite={false}
            curFilmID={3}
            name="title"
            genre="genre"
            released={2009}
            openVideoPlayer={jest.fn()}
            toggleFavorite={jest.fn()}
            isSubmitting={false}
            toggleFormLock={jest.fn()}
            favoriteRequestStatus={{
              isSuccess: false,
              error: {
                isError: false
              }
            }}
            resetFavoriteError={jest.fn()}
          />
        </Router>
    ).toJSON();

  expect(component).toMatchSnapshot();
});
