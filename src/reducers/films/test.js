import types from "./types.js";
import mocks from "./mocks.js";
import utils from "./utils.js";
import actions from "./actions.js";
import selectors from "./selectors.js";
import reducer from "./reducers.js";

describe(`Reducers: Films utils`, () => {
  describe(`Transform RAW server data`, () => {
    it(`Util adaptFilmRawData`, () => {
      const filmRAW = mocks.filmsRAW[0];
      const adaptedFilmData = mocks.adaptedFilmsData[0];

      expect(utils.adaptFilmRAW(filmRAW)).toEqual(adaptedFilmData);
    });

    it(`Util adaptFilmsRAW`, () => {
      expect(utils.adaptFilmsRAW(mocks.filmsRAW)).toEqual(mocks.adaptedFilmsData);
      expect(utils.adaptFilmsRAW([])).toEqual([]);
    });

    it(`Util normalizeFilms`, () => {
      expect(utils.normalizeFilms(mocks.adaptedFilmsData)).toEqual(mocks.normalizedFilmsData);
      expect(utils.normalizeFilms([])).toEqual({
        byIDs: {},
        allIDs: []
      });
    });

    it(`Util transformFilmsRAW`, () => {
      expect(utils.transformFilmsRAW(mocks.filmsRAW)).toEqual(mocks.normalizedFilmsData);
      expect(utils.transformFilmsRAW([])).toEqual({
        byIDs: {},
        allIDs: []
      });
    });
  });
});

describe(`Reducers: Films actions`, () => {
  it(`Action loadFilm`, () => {
    const spy = jest.spyOn(utils, `transformFilmsRAW`);
    spy.mockReturnValue([{film: `norm`}]);
    expect(actions.loadFilms([{film: `any`}])).toEqual({
      type: types.LOAD_FILMS,
      payload: [{film: `norm`}]
    });
  });
});

describe(`Reducers: Films reducers`, () => {
  describe(`Reducer filmsReducer`, () => {
    const initState = {
      data: {
        some: `any`
      }
    };

    it(`Should set state on correct action`, () => {
      const payload = {
        propOne: `one`,
        propTwo: {
          propOne: `two`
        }
      };

      const action = {
        type: types.LOAD_FILMS,
        payload
      };

      expect(reducer({}, action)).toEqual({
        data: payload
      });
      expect(reducer(initState, action)).toEqual({
        data: payload
      });
    });

    it(`Should return state on wrong action`, () => {
      const action = {};
      const store = {
        data: {
          allIDs: [],
          byIDs: {}
        }
      };

      expect(reducer(store, action)).toEqual(store);
      expect(reducer(initState, action)).toEqual(initState);
    });
  });
});

describe(`Reducers: Films selectors`, () => {
  it(`Selector getAllIDs`, () => {
    expect(selectors.getAllIDs(mocks.store)).toEqual([1, 3]);
  });

  it(`Selector getFilmsByIDs`, () => {
    expect(selectors.getFilmsByIDs(mocks.store)).toEqual(mocks.store.films.data.byIDs);
  });

  it(`Selector getAllFilmsGenres`, () => {
    expect(selectors.getAllFilmsGenres(mocks.store)).toEqual(
        [{
          id: 1,
          genre: `genreOne`,
        }, {
          id: 3,
          genre: `genreTwo`,
        }]
    );
  });

  it(`Selector getCurrentCardsInfo`, () => {
    expect(selectors.getCurrentCardsInfo.resultFunc([1, 3], mocks.store.films.data.byIDs, 2)).toEqual(
        [{
          id: 1,
          name: `filmOne`,
          preview: {
            image: `img/filmOne.jpg`,
            videoSrc: `https://some-linkOne`
          }
        }, {
          id: 3,
          name: `filmTwo`,
          preview: {
            image: `img/filmTwo.jpg`,
            videoSrc: `https://some-linkTwo`
          }
        }]
    );

    expect(selectors.getCurrentCardsInfo.resultFunc([1, 3], mocks.store.films.data.byIDs, 1)).toEqual(
        [{
          id: 1,
          name: `filmOne`,
          preview: {
            image: `img/filmOne.jpg`,
            videoSrc: `https://some-linkOne`
          }
        }]
    );

    expect(selectors.getCurrentCardsInfo.resultFunc([3], mocks.store.films.data.byIDs, 1)).toEqual([{
      id: 3,
      name: `filmTwo`,
      preview: {
        image: `img/filmTwo.jpg`,
        videoSrc: `https://some-linkTwo`
      }
    }]);

    expect(selectors.getCurrentCardsInfo.resultFunc([], mocks.store.films.data.byIDs, 0)).toEqual([]);
  });

  it(`Selector getFilmsAmount`, () => {
    expect(selectors.getFilmsAmount(mocks.store)).toBe(2);
  });
});
