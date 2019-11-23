import types from "./types.js";
import StoreNameSpace from "../store-name-space.js";
import {filmsTypes, filmsSelectors, filmsActions} from "../films/index.js";
import {genreFilterTypes, genreFilterActions} from "../genre-filter/index.js";

import actions from "./actions.js";
import operations from "./operations.js";
import reducer from "./reducers.js";
import selectors from "./selectors.js";
import configureAPI from "../../server/configure-API.js";
import MockAdapter from "axios-mock-adapter";

describe(`Reducers: App actions`, () => {
  it(``, () => {
    expect(actions.setAppIsReady(true)).toEqual({
      type: types.SET_APP_IS_READY,
      payload: true
    });
  });
});

describe(`Reducers: App operations`, () => {
  it(`Setup operation with API should work correctly`, () => {
    const api = configureAPI();
    const apiMock = new MockAdapter(api);
    const setupApp = operations.setupApp();

    const dispatch = jest.fn();
    const getState = jest.fn();

    const spyOnLoadFilms = jest.spyOn(filmsActions, `loadFilms`);
    spyOnLoadFilms.mockReturnValue({
      type: filmsTypes.LOAD_FILMS,
      payload: [{film: `normalized`}]
    });

    const spyOnGetAllFilmsGenres = jest.spyOn(filmsSelectors, `getAllFilmsGenres`);
    spyOnGetAllFilmsGenres.mockReturnValue([`mock`]);

    const spyOnSetupFilterState = jest.spyOn(genreFilterActions, `setupFilterState`);
    spyOnSetupFilterState.mockReturnValue({
      type: genreFilterTypes.SETUP_FILTER_STATE,
      payload: [{genre: `ready`}]
    });

    apiMock
      .onGet(`/films`)
      .reply(200, [{film: `raw`}]);

    setupApp(dispatch, getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(getState).toHaveBeenCalledTimes(1);

        expect(spyOnLoadFilms).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: filmsTypes.LOAD_FILMS,
          payload: [{film: `normalized`}]
        });

        expect(spyOnGetAllFilmsGenres).toHaveBeenCalledTimes(1);

        expect(spyOnSetupFilterState).toHaveBeenCalledTimes(1);
        expect(spyOnSetupFilterState).toHaveBeenNthCalledWith(1, [`mock`]);
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: genreFilterTypes.SETUP_FILTER_STATE,
          payload: [{genre: `ready`}]
        });

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: types.SET_APP_IS_READY,
          payload: true
        });
      });
  });
});

describe(`Reducers: App reducer`, () => {
  const appStore = {
    isReady: false
  };

  it(`Reducer appReadyReducer`, () => {
    const action = {
      type: types.SET_APP_IS_READY,
      payload: true
    };

    expect(reducer(appStore, action)).toEqual({
      isReady: true
    });

    expect(reducer(appStore, {})).toEqual(appStore);
  });
});

describe(`Reducers: App selectors`, () => {
  const store = {
    [StoreNameSpace.APP]: {
      isReady: true
    }
  };

  it(`Selector getStoreSpace`, () => {
    expect(selectors.getStoreSpace(store)).toEqual(store[StoreNameSpace.APP]);
  });

  it(`Selector getIsReady`, () => {
    expect(selectors.getIsReady(store)).toEqual(true);
  });
});
