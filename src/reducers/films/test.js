import types from "./types.js";
import mocks from "./mocks.js";
import utils from "./utils.js";
import actions from "./actions.js";
import operations from "./operations.js";
import selectors from "./selectors.js";
import reducer from "./reducers.js";
import MockAdapter from "axios-mock-adapter";
import configureAPI from "../../server/configure-API.js";

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

    it(`Util normolizeFilm`, () => {
      expect(utils.normolizeFilms(mocks.adaptedFilmsData)).toEqual(mocks.normolizedFilmsData);
      expect(utils.normolizeFilms([])).toEqual({
        byIDs: {},
        allIDs: []
      });
    });

    it(`Util transformFilmsRAW`, () => {
      expect(utils.transformFilmsRAW(mocks.filmsRAW)).toEqual(mocks.normolizedFilmsData);
      expect(utils.transformFilmsRAW([])).toEqual({
        byIDs: {},
        allIDs: []
      });
    });
  });
});

describe(`Reducers: Films actions`, () => {
  it(`Action loadFilm`, () => {
    expect(actions.loadFilms([{film: `any`}])).toEqual({
      type: types.LOAD_FILMS,
      payload: [{film: `any`}]
    });
  });
});

describe(`Reducers: Films operations`, () => {
  it(`Load operation with API should work correctly`, () => {
    const api = configureAPI();
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const filmsLoader = operations.loadFilms();

    apiMock
      .onGet(`/films`)
      .reply(200, [{film: `any`}]);

    filmsLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: types.LOAD_FILMS,
          payload: [{film: `any`}]
        });
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

      expect(reducer({}, action)).toEqual({
        data: {}
      });
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

  it(`Selector getCardsInfo`, () => {
    expect(selectors.getCardsInfo(mocks.store)).toEqual(
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
  });

  it(`Selector getFilmsGenres`, () => {
    expect(selectors.getFilmsGenres(mocks.store)).toEqual(
        [{
          id: 1,
          genre: `genreOne`,
        }, {
          id: 3,
          genre: `genreTwo`,
        }]
    );
  });
});
