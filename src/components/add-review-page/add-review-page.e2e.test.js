import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import {AddReviewPage} from "./add-review-page.jsx";
import {films} from "../../mocks/films";

Enzyme.configure({adapter: new Adapter()});

describe(`Component AddReviewPage should work correctly`, () => {
  let component;
  const historyMock = {
    push: jest.fn()
  };
  const postCommentMock = jest.fn();
  const resetPostCommentError = jest.fn();

  beforeEach(() => {
    component = shallow(
        <AddReviewPage
          curFilmID={3}
          film={films[1]}
          history={historyMock}
          postComment={postCommentMock}
          resetPostCommentError={resetPostCommentError}
          isSuccess={false}
        />
    );
  });

  it(`Reset error on component mount`, () => {
    expect(resetPostCommentError).toHaveBeenCalledTimes(1);
  });

  it(`Should redirect on success post`, () => {
    component.setProps({isSuccess: true});
    expect(historyMock.push).toHaveBeenCalledTimes(1);
    expect(historyMock.push).toHaveBeenLastCalledWith(`/films/3`);
    component.setProps({isSuccess: false});
    expect(historyMock.push).toHaveBeenCalledTimes(1);
  });

  it(`Should postComment correctly`, () => {
    component.instance()._postComment(`score`, `comment`);
    expect(postCommentMock).toHaveBeenCalledTimes(1);
    expect(postCommentMock).toHaveBeenLastCalledWith(3, `score`, `comment`);
  });
});
