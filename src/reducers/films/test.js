import types from "./types.js";
import StoreNameSpace from "../store-name-space";
import utils from "./utils.js";
import actions from "./actions.js";
import operations from "./operations.js";
import selectors from "./selectors.js";
import reducer from "./reducers.js";
import configureAPI from "../../server/configure-API.js";
import MockAdapter from "axios-mock-adapter";
import * as filmsMock from "../../mocks/films.js";
import * as storeMock from "../../mocks/store.js";
import {filmsActions} from "./index";


describe(`Reducers: Films utils`, () => {
  describe(`Transform RAW server data`, () => {
    it(`Util adaptFilmRawData`, () => {
      expect(utils.adaptFilmRAW(filmsMock.filmsRAW[0])).toEqual(filmsMock.films[0]);
    });

    it(`Util adaptFilmsRAW`, () => {
      expect(utils.adaptFilmsRAW(filmsMock.filmsRAW)).toEqual(filmsMock.films);
      expect(utils.adaptFilmsRAW([])).toEqual([]);
    });

    it(`Util normalizeFilms`, () => {
      expect(utils.normalizeFilms(filmsMock.films)).toEqual(filmsMock.normalizedFilmsData);
      expect(utils.normalizeFilms([])).toEqual({
        byIDs: {},
        allIDs: []
      });
    });

    it(`Util transformFilmsRAW`, () => {
      expect(utils.transformFilmsRAW(filmsMock.filmsRAW)).toEqual(filmsMock.normalizedFilmsData);
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

  it(`Action loadPromo`, () => {
    expect(actions.loadPromo({"id": 3})).toEqual({
      type: types.LOAD_PROMO,
      payload: 3
    });
  });
});

describe(`Reducers: Film operations`, () => {
  const api = configureAPI();
  const dispatch = jest.fn();
  const _ = jest.fn();

  let apiMock;
  beforeEach(() => {
    jest.resetAllMocks();
    apiMock = new MockAdapter(api);
  });


  it(`Operation loadFilms`, () => {
    const filmsLoader = operations.loadFilms();
    filmsActions.loadFilms = jest.fn(() => {});

    apiMock
      .onGet(`/films`)
      .reply(200, [{film: `raw`}]);

    filmsLoader(dispatch, _, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(filmsActions.loadFilms).toHaveBeenCalledTimes(1);
        expect(filmsActions.loadFilms).toHaveBeenLastCalledWith([{film: `raw`}]);
      });
  });

  it(`Operation loadPromo`, () => {
    const promoLoader = operations.loadPromo();
    filmsActions.loadPromo = jest.fn(() => {});

    apiMock
      .onGet(`/films/promo`)
      .reply(200, [{promo: `raw`}]);

    promoLoader(dispatch, _, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(filmsActions.loadPromo).toHaveBeenCalledTimes(1);
        expect(filmsActions.loadPromo).toHaveBeenLastCalledWith([{promo: `raw`}]);
      });
  });
});

describe(`Reducers: Films reducers`, () => {
  const initState = storeMock.initStore[StoreNameSpace.FILMS];

  describe(`Reducer loadFilmReducer`, () => {
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

      expect(reducer(initState, action)).toEqual({
        data: payload,
        promo: {
          filmID: null
        }
      });
    });

    it(`Should return state on wrong action`, () => {
      expect(reducer(initState, {})).toEqual(initState);
    });
  });

  describe(`Reducer loadPromoReducer`, () => {
    it(`Should set state on correct action`, () => {
      const action = {
        type: types.LOAD_PROMO,
        payload: 3
      };

      expect(reducer(initState, action)).toEqual({
        data: {
          allIDs: [],
          byIDs: {}
        },
        promo: {
          filmID: 3
        }
      });
    });
  });
});

describe(`Reducers: Films selectors`, () => {
  it(`Selector getStoreSpace`, () => {
    expect(selectors.getStoreSpace(storeMock.loadedStore)).toEqual(storeMock.loadedStore[StoreNameSpace.FILMS]);
  });

  it(`Selector getAllIDs`, () => {
    expect(selectors.getAllIDs(storeMock.loadedStore)).toEqual([1, 3]);
  });

  it(`Selector getFilmsByIDs`, () => {
    expect(selectors.getFilmsByIDs(storeMock.loadedStore)).toEqual(storeMock.loadedStore[StoreNameSpace.FILMS].data.byIDs);
  });

  it(`Selector getAllFilmsGenres`, () => {
    expect(selectors.getAllFilmsGenres(storeMock.loadedStore)).toEqual(
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
    expect(selectors.getCurrentCardsInfo.resultFunc([1, 3], storeMock.loadedStore[StoreNameSpace.FILMS].data.byIDs)).toEqual(
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

    expect(selectors.getCurrentCardsInfo.resultFunc([3], storeMock.loadedStore[StoreNameSpace.FILMS].data.byIDs)).toEqual([{
      id: 3,
      name: `filmTwo`,
      preview: {
        image: `img/filmTwo.jpg`,
        videoSrc: `https://some-linkTwo`
      }
    }]);

    expect(selectors.getCurrentCardsInfo.resultFunc([], storeMock.loadedStore[StoreNameSpace.FILMS].data.byIDs)).toEqual([]);
  });

  it(`Selector getDisplayedCardInfo`, () => {
    expect(selectors.getDisplayedCardInfo.resultFunc([1, 2, 3, 4, 5], 2)).toEqual([1, 2]);
    expect(selectors.getDisplayedCardInfo.resultFunc([1, 2, 3, 4, 5], 0)).toEqual([]);
    expect(selectors.getDisplayedCardInfo.resultFunc([1, 2, 3, 4, 5], 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it(`Selector getFilmByCurrentID`, () => {
    expect(selectors.getFilmByCurrentID(storeMock.loadedStore, {curFilmID: 3})).toEqual(filmsMock.films[1]);
  });

  it(`Selector getFilmsAmount`, () => {
    expect(selectors.getFilmsAmount(storeMock.loadedStore)).toBe(2);
  });

  it(`Selector getCurFilmID`, () => {
    expect(selectors.getCurFilmID({}, {curFilmID: 3})).toBe(3);
  });

  it(`Selector getLikeThisCardsInfo`, () => {
    expect(selectors.getLikeThisCardsInfo.resultFunc([{id: 1}, {id: 2}, {id: 3}, {id: 4}], 3, 0))
      .toEqual([]);
    expect(selectors.getLikeThisCardsInfo.resultFunc([{id: 1}, {id: 2}, {id: 3}, {id: 4}], 3, 3))
      .toEqual([{id: 1}, {id: 2}, {id: 4}]);
    expect(selectors.getLikeThisCardsInfo.resultFunc([{id: 1}, {id: 2}, {id: 3}, {id: 4}], 4, 2))
      .toEqual([{id: 1}, {id: 2}]);
  });

  it(`Selector getFilmByCurID`, () => {
    expect(selectors.getFilmByCurID(storeMock.loadedStore, {curFilmID: 3})).toEqual(filmsMock.films[1]);
  });

  it(`Selector getCurFilmGenre`, () => {
    expect(selectors.getCurFilmGenre(storeMock.loadedStore, {curFilmID: 3})).toEqual(`genreTwo`);
  });
  it(`Selector getPromoID`, () => {
    expect(selectors.getPromoID(storeMock.loadedStore)).toBe(3);
  });

  it(`Selector getPromoFilm`, () => {
    expect(selectors.getPromoFilm(storeMock.loadedStore)).toEqual(filmsMock.films[1]);
  });

  it(`Selector getCurFilmName`, () => {
    expect(selectors.getCurFilmName(storeMock.loadedStore, {curFilmID: 3})).toEqual(filmsMock.films[1].name);
  });

  it(`Selector getCurFilmReleased`, () => {
    expect(selectors.getCurFilmReleased(storeMock.loadedStore, {curFilmID: 3})).toEqual(filmsMock.films[1].released);
  });
});
