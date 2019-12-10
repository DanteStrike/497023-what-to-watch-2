import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {MovieControlPanel} from "./movie-control-panel.jsx";

Enzyme.configure({adapter: new Adapter()});

describe(`Component Player should work correctly`, () => {
  let component;
  const openVideoPlayerMock = jest.fn();
  const toggleFavoriteMock = jest.fn();
  const toggleFormLockMock = jest.fn();
  const resetFavoriteErrorMock = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    component = shallow(
        <MovieControlPanel
          isAuth={false}
          isFavorite={false}
          curFilmID={3}
          name="movie-title"
          genre="genre"
          released={2009}
          openVideoPlayer={openVideoPlayerMock}
          toggleFavorite={toggleFavoriteMock}
          isSubmitting={false}
          toggleFormLock={toggleFormLockMock}
          favoriteRequestStatus={{
            isSuccess: false,
            error: {
              isError: false
            }
          }}
          resetFavoriteError={resetFavoriteErrorMock}
        />
    );
  });

  it(`Show buttons on Auth`, () => {
    expect(component.find(`.btn--list`)).toHaveLength(0);
    expect(component.find(`Link`)).toHaveLength(0);
    component.setProps({isAuth: true});
    expect(component.find(`.btn--list`)).toHaveLength(1);
    expect(component.find(`Link`)).toHaveLength(1);
  });

  it(`Favorite btn icons should switch`, () => {
    component.setProps({isAuth: true});
    expect(component.find(`.btn--list use`).props().xlinkHref).toEqual(`#add`);
    component.setProps({isFavorite: true});
    expect(component.find(`.btn--list use`).props().xlinkHref).toEqual(`#in-list`);
  });

  it(`Should correctly callback on button click`, () => {
    component.instance()._handleFavoriteToggleClick = jest.fn();
    component.instance()._handlePlayButtonClick = jest.fn();
    component.setProps({isAuth: true});
    component.find(`.btn--list`).simulate(`click`);
    expect(component.instance()._handleFavoriteToggleClick).toHaveBeenCalledTimes(1);
    component.find(`.btn--play`).simulate(`click`);
    expect(component.instance()._handlePlayButtonClick).toHaveBeenCalledTimes(1);
  });

  it(`Should open video player on play button click`, () => {
    component.instance()._handlePlayButtonClick();
    expect(openVideoPlayerMock).toHaveBeenCalledTimes(1);
    expect(openVideoPlayerMock).toHaveBeenLastCalledWith(3);
  });

  it(`Should toggle my-list correctly`, () => {
    component.instance()._handleFavoriteToggleClick();
    expect(toggleFormLockMock).toHaveBeenCalledTimes(1);
    expect(resetFavoriteErrorMock).toHaveBeenCalledTimes(1);
    expect(toggleFavoriteMock).toHaveBeenCalledTimes(1);
    expect(toggleFavoriteMock).toHaveBeenLastCalledWith(3, 1);

    component.setProps({isFavorite: true});
    component.instance()._handleFavoriteToggleClick();
    expect(toggleFavoriteMock).toHaveBeenLastCalledWith(3, 0);
  });

  it(`Should unlock form`, () => {
    component.setProps({isSubmitting: true});
    component.update();
    expect(toggleFormLockMock).not.toHaveBeenCalled();
    component.setProps({favoriteRequestStatus: {
      isSuccess: false,
      error: {isError: true}}
    });
    expect(toggleFormLockMock).toHaveBeenCalledTimes(1);
    component.setProps({favoriteRequestStatus: {
      isSuccess: false,
      error: {isError: false}}
    });
    expect(toggleFormLockMock).toHaveBeenCalledTimes(1);

    component.setProps({isSubmitting: true});
    component.setProps({favoriteRequestStatus: {
      isSuccess: true,
      error: {isError: false}
    }});
    expect(toggleFormLockMock).toHaveBeenCalledTimes(2);
    component.setProps({favoriteRequestStatus: {
      isSuccess: false,
      error: {isError: false}
    }});
    expect(toggleFormLockMock).toHaveBeenCalledTimes(2);
  });

  it(`Should style my-list button correctly`, () => {
    expect(component.instance()._getButtonPlayStyle()).toEqual({});
    component.setProps({isSubmitting: true});
    expect(component.instance()._getButtonPlayStyle()).toEqual({cursor: `wait`});
    component.setProps({favoriteRequestStatus: {
      isSuccess: false,
      error: {isError: true}
    }});
    expect(component.instance()._getButtonPlayStyle()).toEqual({
      cursor: `wait`,
      boxShadow: `0px 0px 0px 2px rgba(255,0,0,1)`
    });
    component.setProps({isSubmitting: false});
    expect(component.instance()._getButtonPlayStyle()).toEqual({
      boxShadow: `0px 0px 0px 2px rgba(255,0,0,1)`
    });
  });

  it(`Should reset error state on unmount`, () => {
    component.unmount();
    expect(resetFavoriteErrorMock).toHaveBeenCalledTimes(1);
  });
});
