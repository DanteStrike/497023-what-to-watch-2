import types from "./types.js";
import actions from "./actions.js";
import reducer from "./reducers.js";
import selectors from "./selectors.js";

describe(`Reducers: Movie list actions`, () => {
  describe(`Action showMoreFilms`, () => {
    it(`Should return payload = increaseFilmsAmountRate`, () => {
      expect(actions.showMoreFilms(0, 20, 99)).toEqual({
        type: types.SHOW_MORE_FILMS,
        payload: 20
      });
      expect(actions.showMoreFilms(10, 30, 99)).toEqual({
        type: types.SHOW_MORE_FILMS,
        payload: 30
      });
    });

    it(`Should return payload = available increase rate on overflow`, () => {
      expect(actions.showMoreFilms(20, 20, 20)).toEqual({
        type: types.SHOW_MORE_FILMS,
        payload: 0
      });
      expect(actions.showMoreFilms(20, 20, 21)).toEqual({
        type: types.SHOW_MORE_FILMS,
        payload: 1
      });
      expect(actions.showMoreFilms(18, 20, 21)).toEqual({
        type: types.SHOW_MORE_FILMS,
        payload: 3
      });
      expect(actions.showMoreFilms(19, 20, 25)).toEqual({
        type: types.SHOW_MORE_FILMS,
        payload: 6
      });
    });
  });

  it(`Action setDisplayedFilmsAmount`, () => {
    expect(actions.setDisplayedFilmsAmount(22, 23)).toEqual({
      type: types.SET_DISPLAYED_FILMS_AMOUNT,
      payload: 22
    });

    expect(actions.setDisplayedFilmsAmount(22, 20)).toEqual({
      type: types.SET_DISPLAYED_FILMS_AMOUNT,
      payload: 20
    });
  });
});

describe(`Reducers: Movie list reducer`, () => {
  const initState = {
    displayedFilmsAmount: 20
  };

  describe(`displayedFilmsAmountReducer`, () => {
    it(`reducer should return state on empty/wrong action`, () => {
      expect(reducer(initState, {})).toEqual({
        displayedFilmsAmount: 20
      });
    });

    it(`reducer should set displayedFilmsAmount correctly`, () => {
      const action = {
        type: types.SET_DISPLAYED_FILMS_AMOUNT,
        payload: 30
      };

      expect(reducer(initState, action)).toEqual({
        displayedFilmsAmount: 30
      });
    });

    it(`reducer should increase displayedFilmsAmount correctly`, () => {
      const action = {
        type: types.SHOW_MORE_FILMS,
        payload: 20
      };

      expect(reducer(initState, action)).toEqual({
        displayedFilmsAmount: 40
      });
    });
  });
});

describe(`Reducers: Movie list selectors`, () => {
  const store = {
    movieList: {
      displayedFilmsAmount: 13
    }
  };
  expect(selectors.getDisplayedFilmsAmount(store)).toBe(13);
});
