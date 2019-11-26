import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {MoviePage} from "./movie-page.jsx";
import {films} from "../../mocks/films.js";
import {comments} from "../../mocks/comments.js";

Enzyme.configure({adapter: new Adapter()});

describe(`Component MoviePage should work correctly`, () => {
  let component;
  const renderTabsMock = jest.fn();
  const resetTabsMock = jest.fn();
  const loadCurFilmCommentsMock = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    component = shallow(
        <MoviePage
          curFilmID={1}
          renderTabs={renderTabsMock}
          resetTabs={resetTabsMock}
          film={films[0]}
          comments={comments}
          loadCurFilmComments={loadCurFilmCommentsMock}
        />
    );
  });

  it(`Should render tabs correctly`, () => {
    expect(renderTabsMock).toHaveBeenCalledTimes(1);
    expect(renderTabsMock).toHaveBeenLastCalledWith([films[0], films[0], comments]);
  });

  it(`Should load comments for curFilmID on did mount`, () => {
    expect(loadCurFilmCommentsMock).toHaveBeenCalledTimes(1);
    expect(loadCurFilmCommentsMock).toHaveBeenLastCalledWith(1);
  });

  it(`Should reset tabs and load new comments on movie pages switch`, () => {
    expect(resetTabsMock).toHaveBeenCalledTimes(0);
    expect(loadCurFilmCommentsMock).toHaveBeenCalledTimes(1);
    component.update();
    expect(resetTabsMock).toHaveBeenCalledTimes(0);
    expect(loadCurFilmCommentsMock).toHaveBeenCalledTimes(1);
    component.setProps({curFilmID: 222});
    expect(resetTabsMock).toHaveBeenCalledTimes(1);
    expect(loadCurFilmCommentsMock).toHaveBeenCalledTimes(2);
    expect(loadCurFilmCommentsMock).toHaveBeenLastCalledWith(222);
  });
});
