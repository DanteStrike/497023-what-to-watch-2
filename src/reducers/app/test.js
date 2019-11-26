import types from "./types.js";
import StoreNameSpace from "../store-name-space.js";
import {filmsSelectors, filmsOperations} from "../films/index.js";
import {genreFilterTypes, genreFilterActions} from "../genres/index.js";

import actions from "./actions.js";
import operations from "./operations.js";
import reducer from "./reducers.js";
import selectors from "./selectors.js";
import * as storeMock from "../../mocks/store.js";


describe(`Reducers: App actions`, () => {
  it(`Action setAppIsReady`, () => {
    expect(actions.setAppIsReady(true)).toEqual({
      type: types.SET_APP_IS_READY,
      payload: true
    });
  });

  it(`Action openVideoPlayer`, () => {
    expect(actions.openVideoPlayer(1)).toEqual({
      type: types.OPEN_VIDEO_PLAYER,
      payload: 1
    });
  });

  it(`Action closeVideoPlayer`, () => {
    expect(actions.closeVideoPlayer(1)).toEqual({
      type: types.CLOSE_VIDEO_PLAYER
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
  const appStore = storeMock.initStore[StoreNameSpace.APP];

  it(`Should return state on default`, () => {
    expect(reducer(appStore, {})).toEqual(appStore);
  });

  it(`Reducer appReadyReducer`, () => {
    const action = {
      type: types.SET_APP_IS_READY,
      payload: true
    };

    expect(reducer(appStore, action)).toEqual({
      isReady: true,
      videoPlayerFilmID: -1
    });

    expect(reducer(appStore, {})).toEqual(appStore);
  });

  describe(`Reducer videoPlayerReducer`, () => {
    it(`Should open VideoPlayerID with curFilmID`, () => {
      const action = {
        type: types.OPEN_VIDEO_PLAYER,
        payload: 1
      };
      expect(reducer(appStore, action)).toEqual({
        isReady: false,
        videoPlayerFilmID: 1
      });
    });

    it(`Should reset VideoPlayerID`, () => {
      const action = {
        type: types.CLOSE_VIDEO_PLAYER,
        payload: `any`
      };
      expect(reducer(storeMock.loadedStore[StoreNameSpace.APP], action)).toEqual({
        isReady: true,
        videoPlayerFilmID: -1
      });
    });
  });
});

describe(`Reducers: App selectors`, () => {
  it(`Selector getStoreSpace`, () => {
    expect(selectors.getStoreSpace(storeMock.loadedStore)).toEqual(storeMock.loadedStore[StoreNameSpace.APP]);
  });

  it(`Selector getIsReady`, () => {
    expect(selectors.getIsReady(storeMock.loadedStore)).toEqual(true);
  });

  it(`Select getVideoPlayerFilmID`, () => {
    expect(selectors.getVideoPlayerFilmID(storeMock.loadedStore)).toBe(1);
  });
});
