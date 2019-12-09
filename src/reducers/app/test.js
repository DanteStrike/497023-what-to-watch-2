import types from "./types.js";
import StoreNameSpace from "../store-name-space.js";
import {filmsSelectors, filmsOperations} from "../films/films.js";
import {genreFilterActions} from "../genres/genres.js";

import actions from "./actions.js";
import operations from "./operations.js";
import reducer from "./reducers.js";
import selectors from "./selectors.js";
import * as storeMock from "../../mocks/store.js";
import {films} from "../../mocks/films.js";
import {userOperations} from "../user/user";
import Constants from "../../constants";


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
    expect(actions.closeVideoPlayer()).toEqual({
      type: types.CLOSE_VIDEO_PLAYER
    });
  });

  it(`Action initSetupAppError`, () => {
    expect(actions.initSetupAppError(111, `any`)).toEqual({
      type: types.INIT_SETUP_APP_ERROR,
      payload: {
        code: 111,
        msg: `any`
      }
    });
  });

  it(`Action resetSetupAppError`, () => {
    expect(actions.resetSetupAppError()).toEqual({
      type: types.RESET_SETUP_APP_ERROR
    });
  });
});

describe(`Reducers: App operations`, () => {
  let setupApp;
  const dispatch = jest.fn();
  const getState = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    setupApp = operations.setupApp();
  });

  it(`Setup operation with API should work correctly`, () => {
    dispatch.mockResolvedValue(`resolved`);
    filmsOperations.loadFilms = jest.fn(() => {});
    filmsOperations.loadPromo = jest.fn(() => {});
    filmsSelectors.getAllFilmsGenres = jest.fn(() => {}).mockReturnValue([`mock`]);
    genreFilterActions.setupFilterState = jest.fn(() => {});
    userOperations.checkAuth = jest.fn(() => {});
    userOperations.getMyListFilms = jest.fn(() => {});
    actions.setAppIsReady = jest.fn(() => {});

    setupApp(dispatch, getState)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(6);
        expect(getState).toHaveBeenCalledTimes(1);

        expect(filmsOperations.loadFilms).toHaveBeenCalledTimes(1);
        expect(filmsOperations.loadPromo).toHaveBeenCalledTimes(1);
        expect(filmsSelectors.getAllFilmsGenres).toHaveBeenCalledTimes(1);
        expect(genreFilterActions.setupFilterState).toHaveBeenCalledTimes(1);
        expect(genreFilterActions.setupFilterState).toHaveBeenLastCalledWith([`mock`]);
        expect(userOperations.checkAuth).toHaveBeenCalledTimes(1);
        expect(userOperations.getMyListFilms).toHaveBeenCalledTimes(1);
        expect(actions.setAppIsReady).toHaveBeenCalledTimes(1);
      });
  });

  it(`Setup operation with API should work correctly (timeout)`, () => {
    dispatch.mockRejectedValueOnce({
      code: Constants.RequestErrorCode.TIMEOUT,
      message: `any`
    });
    actions.initSetupAppError = jest.fn(() => {
    });

    setupApp(dispatch, jest.fn())
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(actions.initSetupAppError).toHaveBeenCalledTimes(1);
        expect(actions.initSetupAppError).toHaveBeenLastCalledWith(Constants.RequestErrorCode.TIMEOUT, `any`);
      });
  });

  it(`Setup operation with API should work correctly (404)`, () => {
    dispatch.mockRejectedValueOnce({
      response: {
        status: 404,
        data: {error: `errorMsg`}
      }
    });
    setupApp(dispatch, jest.fn())
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(actions.initSetupAppError).toHaveBeenCalledTimes(1);
        expect(actions.initSetupAppError).toHaveBeenLastCalledWith(404, `errorMsg`);
      });
  });

  it(`Setup operation with API should work correctly (network error)`, () => {
    dispatch.mockRejectedValueOnce({
      message: `network error`
    });
    setupApp(dispatch, jest.fn())
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(actions.initSetupAppError).toHaveBeenCalledTimes(1);
        expect(actions.initSetupAppError).toHaveBeenLastCalledWith(null, `network error`);
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

    expect(reducer(appStore, action).isReady).toEqual(true);

    expect(reducer(appStore, {})).toEqual(appStore);
  });

  describe(`Reducer videoPlayerReducer`, () => {
    it(`Should open VideoPlayerID with curFilmID`, () => {
      const action = {
        type: types.OPEN_VIDEO_PLAYER,
        payload: 1
      };
      expect(reducer(appStore, action).videoPlayerFilmID).toBe(1);
    });

    it(`Should reset VideoPlayerID`, () => {
      const action = {
        type: types.CLOSE_VIDEO_PLAYER,
        payload: `any`
      };
      expect(reducer(storeMock.loadedStore[StoreNameSpace.APP], action).videoPlayerFilmID).toBe(-1);
    });
  });

  describe(`Reducer setupAppReducer`, () => {
    it(`Should init setup app error`, () => {
      const action = {
        type: types.INIT_SETUP_APP_ERROR,
        payload: {
          code: 400,
          msg: `msg`
        }
      };
      expect(reducer(appStore, action).setupAppError).toEqual({
        isError: true,
        code: 400,
        msg: `msg`
      });
    });

    it(`Should reset setup app error`, () => {
      const action = {
        type: types.RESET_SETUP_APP_ERROR
      };

      expect(reducer(appStore, action).setupAppError).toEqual({
        isError: false,
        code: null,
        msg: ``
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

  it(`Select getVideoPlayerInfo`, () => {
    expect(selectors.getVideoPlayerInfo(storeMock.loadedStore)).toEqual(films[0].videoSrc);
  });

  it(`Select getSetupAppError`, () => {
    expect(selectors.getSetupAppError(storeMock.loadedStore)).toEqual({
      isError: false,
      code: null,
      msg: ``
    });
  });
});
