import React from "react";
import renderer from "react-test-renderer";

import MoviePageReviews from "./movie-page-reviews.jsx";
import {comments} from "../../mocks/comments.js";


it(`Render correctly MoviePageReviews component`, () => {
  const filmReviewsMock = comments;

  const component = renderer
    .create(
        <MoviePageReviews
          filmReviews={filmReviewsMock}
        />
    ).toJSON();

  expect(component).toMatchSnapshot();
});
