import types from "./types.js";
import StoreNameSpace from "../store-name-space.js";
import {filmsSelectors, filmsOperations} from "../films/index.js";
import {genreFilterTypes, genreFilterActions} from "../genres/index.js";

import actions from "./actions.js";
import operations from "./operations.js";
import reducer from "./reducers.js";
import selectors from "./selectors.js";


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
    const setupApp = operations.setupApp();

    const dispatch = jest.fn().mockResolvedValue(`resolved`);
    const getState = jest.fn();

    const spyOnLoadFilms = jest.spyOn(filmsOperations, `loadFilms`);
    const spyOnLoadPromo = jest.spyOn(filmsOperations, `loadPromo`);

    const spyOnGetAllFilmsGenres = jest.spyOn(filmsSelectors, `getAllFilmsGenres`);
    spyOnGetAllFilmsGenres.mockReturnValue([`mock`]);

    const spyOnSetupFilterState = jest.spyOn(genreFilterActions, `setupFilterState`);
    spyOnSetupFilterState.mockReturnValue({
      type: genreFilterTypes.SETUP_FILTER_STATE,
      payload: [{genre: `ready`}]
    });

    setupApp(dispatch, getState)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(4);
        expect(getState).toHaveBeenCalledTimes(1);

        expect(spyOnLoadFilms).toHaveBeenCalledTimes(1);
        expect(spyOnLoadPromo).toHaveBeenCalledTimes(1);
        expect(spyOnGetAllFilmsGenres).toHaveBeenCalledTimes(1);
        expect(spyOnSetupFilterState).toHaveBeenCalledTimes(1);

        expect(spyOnSetupFilterState).toHaveBeenNthCalledWith(1, [`mock`]);
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: genreFilterTypes.SETUP_FILTER_STATE,
          payload: [{genre: `ready`}]
        });

        expect(dispatch).toHaveBeenNthCalledWith(4, {
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
