import types from "./types.js";
import StoreNameSpace from "../store-name-space";
import actions from "./actions.js";
import operations from "./operations.js";
import selectors from "./selectors.js";
import reducer from "./reducers.js";
import utils from "./utils";
import configureAPI from "../../configure-API";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import * as storeMock from "../../mocks/store.js";
import * as filmsMock from "../../mocks/films.js";
import {userSelectors} from "./user";
import {updateObject} from "../../utils/object/object.js";

describe(`Reducers: User utils`, () => {
  it(`Util adaptUserProfile`, () => {
    expect(utils.adaptUserProfile({
      id: 1,
      email: `Oliver.conner@gmail.com`,
      name: `Oliver.conner`,
      [`avatar_url`]: `/img/1.png`
    })).toEqual({
      id: 1,
      email: `Oliver.conner@gmail.com`,
      name: `Oliver.conner`,
      avatarUrl: `http://htmlacademy-react-2.appspot.com/img/1.png`
    });

    expect(utils.adaptUserProfile({
      email: `Oliver.conner@gmail.com`,
      name: `Oliver.conner`,
      [`avatar_url`]: `/img/1.png`
    })).toEqual({
      id: null,
      email: `Oliver.conner@gmail.com`,
      name: `Oliver.conner`,
      avatarUrl: `http://htmlacademy-react-2.appspot.com/img/1.png`
    });
  });

  it(`Util getIDsList`, () => {
    expect(utils.getIDsList(filmsMock.filmsRAW)).toEqual([1, 3]);
  });

  it(`Util decodeServerErrMsg`, () => {
    expect(utils.decodeServerErrMsg(`child "email" fails because ["email" must be a valid email]`))
      .toEqual({
        target: `email`,
        msg: `"email" must be a valid email`
      });
    expect(utils.decodeServerErrMsg(`any`))
      .toEqual({
        target: ``,
        msg: `any`
      });
  });
});

describe(`Reducers: User actions`, () => {
  it(`Action setAuthSuccess`, () => {
    expect(actions.setAuthSuccess()).toEqual({
      type: types.SET_AUTH_SUCCESS
    });
  });

  it(`Action setAuthRequired`, () => {
    expect(actions.setAuthRequired()).toEqual({
      type: types.SET_AUTH_REQUIRED
    });
  });

  it(`Action resetAuthErrors`, () => {
    expect(actions.resetAuthErrors()).toEqual({
      type: types.RESET_AUTH_ERRORS
    });
  });

  it(`Action setMyListLoaded`, () => {
    expect(actions.setMyListLoaded()).toEqual({
      type: types.SET_MY_LIST_LOADED
    });
  });

  it(`Action initAuthServerError`, () => {
    utils.decodeServerErrMsg = jest.fn(() => ({
      target: `any`,
      msg: `msgAny`
    }));
    expect(actions.initAuthServerError(`error`)).toEqual({
      type: types.INIT_AUTH_SERVER_ERROR,
      payload: {
        target: `any`,
        msg: `msgAny`
      }
    });
    expect(utils.decodeServerErrMsg).toHaveBeenCalled();
  });

  it(`Action setUserProfile`, () => {
    utils.adaptUserProfile = jest.fn();
    utils.adaptUserProfile.mockReturnValue(`adaptData`);

    expect(actions.setUserProfile(`rawData`)).toEqual({
      type: types.SET_USER_PROFILE,
      payload: `adaptData`
    });
    expect(utils.adaptUserProfile).toHaveBeenCalledTimes(1);
  });

  it(`Action setUserMyList`, () => {
    utils.getIDsList = jest.fn();
    utils.getIDsList.mockReturnValue([1, 2]);

    expect(actions.setUserMyList([`any`, `any`])).toEqual({
      type: types.SET_USER_MY_LIST,
      payload: [1, 2]
    });
    expect(utils.getIDsList).toHaveBeenCalledTimes(1);
  });

  it(`Action clearUserData`, () => {
    expect(actions.clearUserData([`any`, `any`])).toEqual({
      type: types.CLEAR_USER_DATA,
    });
  });

  it(`Action addFilmToMylist`, () => {
    expect(actions.addFilmToMylist(3, [9, 2, 4, 1])).toEqual({
      type: types.SET_USER_MY_LIST,
      payload: [9, 2, 4, 1, 3]
    });
  });

  it(`Action delFilmFromMyList`, () => {
    expect(actions.delFilmFromMyList(3, [9, 2, 3, 1])).toEqual({
      type: types.SET_USER_MY_LIST,
      payload: [9, 2, 1]
    });
  });

  it(`Action setFavoriteSuccess`, () => {
    expect(actions.setFavoriteSuccess()).toEqual({
      type: types.SET_FAVORITE_SUCCESS,
    });
  });

  it(`Action initFavoriteError`, () => {
    expect(actions.initFavoriteError(`msg`)).toEqual({
      type: types.INIT_FAVORITE_ERROR
    });
  });

  it(`Action resetFavoriteError`, () => {
    expect(actions.resetFavoriteError()).toEqual({
      type: types.RESET_FAVORITE_ERROR
    });
  });

  it(`Action initMyListRequest`, () => {
    expect(actions.initMyListRequest()).toEqual({
      type: types.INIT_MY_LIST_REQUEST
    });
  });

  it(`Action compliteMyListRequest`, () => {
    expect(actions.compliteMyListRequest()).toEqual({
      type: types.COMPLITE_MY_LIST_REQUEST
    });
  });
});

describe(`Reducers: User reducers`, () => {
  const initState = storeMock.initStore[StoreNameSpace.USER];
  const loadedStore = storeMock.loadedStore[StoreNameSpace.USER];

  it(`return default state on empty action`, () => {
    expect(reducer(initState, {})).toEqual(initState);
  });

  describe(`Reducer authReducer`, () => {
    it(`Should change isAuth state correctly`, () => {
      const actionOne = {
        type: types.SET_AUTH_SUCCESS
      };

      expect(reducer(initState, actionOne).auth).toEqual({
        isAuth: true,
        error: {
          isError: false,
          target: ``,
          msg: ``
        }
      });

      const actionTwo = {
        type: types.SET_AUTH_REQUIRED
      };
      expect(reducer(loadedStore, actionTwo).auth).toEqual({
        isAuth: false,
        error: {
          isError: true,
          target: `target`,
          msg: `any`
        }
      });
    });
    it(`Should init error correctly`, () => {
      const action = {
        type: types.INIT_AUTH_SERVER_ERROR,
        payload: {
          target: `target`,
          msg: `errorMsg`
        }
      };

      expect(reducer(initState, action).auth).toEqual({
        isAuth: false,
        error: {
          isError: true,
          target: `target`,
          msg: `errorMsg`
        }
      });
    });
    it(`Should reset error`, () => {
      const action = {
        type: types.RESET_AUTH_ERRORS
      };
      expect(reducer(loadedStore, action).auth).toEqual({
        isAuth: true,
        error: {
          isError: false,
          target: ``,
          msg: ``
        }
      });
    });
  });

  describe(`Reducer userProfileReducer`, () => {
    it(`Should set user profile`, () => {
      const action = {
        type: types.SET_USER_PROFILE,
        payload: {
          id: 0,
          email: `email`,
          name: `name`,
          avatarUrl: `avatar`
        }
      };

      expect(reducer(initState, action).data).toEqual({
        id: 0,
        email: `email`,
        name: `name`,
        avatarUrl: `avatar`,
        myListFilmsIDs: []
      });
    });
    it(`Should set user mylist`, () => {
      const action = {
        type: types.SET_USER_MY_LIST,
        payload: [`any`, `any`]
      };

      expect(reducer(initState, action).data).toEqual({
        id: null,
        email: ``,
        name: ``,
        avatarUrl: ``,
        myListFilmsIDs: [`any`, `any`]
      });
    });
    it(`Should clear user data`, () => {
      const action = {
        type: types.CLEAR_USER_DATA
      };

      expect(reducer(loadedStore, action).data).toEqual({
        id: null,
        email: ``,
        name: ``,
        avatarUrl: ``,
        myListFilmsIDs: []
      });
    });
  });

  describe(`Reducer favoriteRequestStatusReducer`, () => {
    it(`Should init error`, () => {
      const action = {
        type: types.INIT_FAVORITE_ERROR
      };
      expect(reducer(initState, action).toggleFavoriteStatus).toEqual({
        isSuccess: false,
        error: {
          isError: true
        }
      });
    });

    it(`Should set isSuccess on success`, () => {
      const action = {
        type: types.SET_FAVORITE_SUCCESS,
      };
      expect(reducer(initState, action).toggleFavoriteStatus).toEqual({
        isSuccess: true,
        error: {
          isError: false
        }
      });
    });

    it(`Should reset request state`, () => {
      const action = {
        type: types.RESET_FAVORITE_ERROR,
      };
      expect(reducer(loadedStore, action).toggleFavoriteStatus).toEqual({
        isSuccess: false,
        error: {
          isError: false
        }
      });
    });
  });

  describe(`Reducer myListStatusReducer`, () => {
    it(`Should set loaded status`, () => {
      const action = {
        type: types.SET_MY_LIST_LOADED
      };

      expect(reducer(initState, action).myListStatus).toEqual({
        isMyListLoaded: true,
        isLoading: false
      });
    });

    it(`Should fix request start`, () => {
      const action = {
        type: types.INIT_MY_LIST_REQUEST
      };

      expect(reducer(initState, action).myListStatus).toEqual({
        isMyListLoaded: false,
        isLoading: true
      });
    });

    it(`Should fix request end`, () => {
      const action = {
        type: types.COMPLITE_MY_LIST_REQUEST
      };

      expect(reducer(updateObject(loadedStore, {myListStatus: {
        isMyListLoaded: false,
        isLoading: true
      }}), action).myListStatus).toEqual({
        isMyListLoaded: false,
        isLoading: false
      });
    });

    it(`Should reset state`, () => {
      const action = {
        type: types.CLEAR_USER_DATA
      };

      expect(reducer(loadedStore, action).myListStatus).toEqual({
        isMyListLoaded: false,
        isLoading: false
      });
    });
  });
});

describe(`Reducers: User selectors`, () => {
  it(`Selector getIsAuth`, () => {
    expect(selectors.getIsAuth(storeMock.loadedStore)).toEqual(true);
  });

  it(`Selector getAuthError`, () => {
    expect(selectors.getAuthError(storeMock.loadedStore)).toEqual({
      isError: true,
      target: `target`,
      msg: `any`
    });
  });

  it(`Selector getAvatarUrl`, () => {
    expect(selectors.getAvatarUrl(storeMock.loadedStore)).toEqual(`img/1.png`);
  });

  it(`Selector getFavoritesIDs`, () => {
    expect(selectors.getFavoritesIDs(storeMock.loadedStore)).toEqual([3]);
  });

  it(`Selector getIsMyListLoaded`, () => {
    expect(selectors.getMyListStatus(storeMock.loadedStore)).toEqual({
      isMyListLoaded: true,
      isLoading: false
    });
  });
});

describe(`Reducers: User operations`, () => {
  const api = configureAPI();
  const dispatch = jest.fn();
  const getState = jest.fn();
  const _ = jest.fn();

  let apiMock;
  beforeEach(() => {
    jest.resetAllMocks();
    apiMock = new MockAdapter(api);
  });

  it(`Operation checkAuth`, () => {
    const loginChecker = operations.checkAuth();
    actions.setAuthSuccess = jest.fn(() => {});
    actions.setUserProfile = jest.fn(() => {});

    apiMock
      .onGet(`/login`)
      .reply(200, {profile: `any`});

    loginChecker(dispatch, _, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(actions.setAuthSuccess).toHaveBeenCalledTimes(1);
        expect(actions.setUserProfile).toHaveBeenCalledTimes(1);
        expect(actions.setUserProfile).toHaveBeenLastCalledWith({profile: `any`});
      });
  });

  it(`Operation sentAuthRequest SUCCESS`, () => {
    const CancelToken = axios.CancelToken;
    const sentAuthLoader = operations.sentAuthRequest(`correct`, `correct`, CancelToken.source());
    actions.setAuthSuccess = jest.fn(() => {});
    actions.setUserProfile = jest.fn(() => {});

    apiMock
      .onPost(`/login`)
      .reply(200, {profile: `any`});

    sentAuthLoader(dispatch, _, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(actions.setAuthSuccess).toHaveBeenCalledTimes(1);
        expect(actions.setUserProfile).toHaveBeenCalledTimes(1);
        expect(actions.setUserProfile).toHaveBeenLastCalledWith({profile: `any`});
      });
  });

  it(`Operation sentAuthRequest 400 ERROR`, () => {
    const CancelToken = axios.CancelToken;
    const sentAuthLoader = operations.sentAuthRequest(`in-correct`, `in-correct`, CancelToken.source());
    actions.initAuthServerError = jest.fn(() => {});

    apiMock
      .onPost(`/login`)
      .reply(400, {error: {code: 111, message: `any`}});

    sentAuthLoader(dispatch, _, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(actions.initAuthServerError).toHaveBeenCalledTimes(1);
        expect(actions.initAuthServerError).toHaveBeenLastCalledWith({code: 111, message: `any`});
      });
  });

  it(`Operation sentAuthRequest timout`, () => {
    const CancelToken = axios.CancelToken;
    const sentAuthLoader = operations.sentAuthRequest(`in-correct`, `in-correct`, CancelToken.source());
    actions.initAuthServerError = jest.fn(() => {});

    apiMock
      .onPost(`/login`)
      .timeout();

    sentAuthLoader(dispatch, _, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(actions.initAuthServerError).toHaveBeenCalledTimes(1);
        expect(actions.initAuthServerError).toHaveBeenLastCalledWith(`timeout of 5000ms exceeded`);
      });
  });

  it(`Operation sentAuthRequest manual cancel`, () => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const sentAuthLoader = operations.sentAuthRequest(`correct`, `correct`, source);
    actions.initAuthServerError = jest.fn(() => {});
    const spy = jest.spyOn(axios, `isCancel`);
    spy.mockReturnValue(true);

    apiMock
      .onPost(`/login`);

    source.cancel(`MANUAL CANCEL`);

    sentAuthLoader(dispatch, _, api)
      .then(() => {
        expect(spy).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledTimes(0);
        expect(actions.initAuthServerError).toHaveBeenCalledTimes(0);
      });
  });

  it(`Operation getMyListFilms`, () => {
    const myListLoader = operations.getMyListFilms();
    actions.setUserMyList = jest.fn(() => {});
    actions.setMyListLoaded = jest.fn(() => {});

    apiMock
      .onGet(`/favorite`)
      .reply(200, [{favoriteFilm: `raw`}, {favoriteFilm: `raw`}]);

    myListLoader(dispatch, _, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(actions.setUserMyList).toHaveBeenCalledTimes(1);
        expect(actions.setUserMyList).toHaveBeenLastCalledWith([{favoriteFilm: `raw`}, {favoriteFilm: `raw`}]);
        expect(actions.setMyListLoaded).toHaveBeenCalledTimes(1);
      });
  });

  it(`Operation toggleFavorite (newState = 1)`, () => {
    const toggleFavoriteLoader = operations.toggleFavorite(4, 1);
    actions.addFilmToMylist = jest.fn(() => {});
    actions.setFavoriteSuccess = jest.fn(() => {});
    userSelectors.getFavoritesIDs = jest.fn();
    userSelectors.getFavoritesIDs.mockReturnValue([3, 6, 2]);

    apiMock
      .onPost(`/favorite/4/1`)
      .reply(200, {any: `any`});

    toggleFavoriteLoader(dispatch, getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(userSelectors.getFavoritesIDs).toHaveBeenCalledTimes(1);
        expect(getState).toHaveBeenCalledTimes(1);
        expect(actions.addFilmToMylist).toHaveBeenCalledTimes(1);
        expect(actions.addFilmToMylist).toHaveBeenLastCalledWith(4, [3, 6, 2]);
        expect(actions.setFavoriteSuccess).toHaveBeenCalledTimes(1);
      });
  });

  it(`Operation toggleFavorite (newState = 0)`, () => {
    const toggleFavoriteLoader = operations.toggleFavorite(6, 0);
    actions.delFilmFromMyList = jest.fn(() => {});
    actions.setFavoriteSuccess = jest.fn(() => {});
    userSelectors.getFavoritesIDs = jest.fn(() => {});
    userSelectors.getFavoritesIDs.mockReturnValue([3, 6, 2, 4]);

    apiMock
      .onPost(`/favorite/6/0`)
      .reply(200, {any: `any`});

    toggleFavoriteLoader(dispatch, getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(userSelectors.getFavoritesIDs).toHaveBeenCalledTimes(1);
        expect(getState).toHaveBeenCalledTimes(1);
        expect(actions.delFilmFromMyList).toHaveBeenCalledTimes(1);
        expect(actions.delFilmFromMyList).toHaveBeenLastCalledWith(6, [3, 6, 2, 4]);
        expect(actions.setFavoriteSuccess).toHaveBeenCalledTimes(1);
      });
  });

  it(`Operation toggleFavorite (timeout)`, () => {
    const toggleFavoriteLoader = operations.toggleFavorite(8, 1);
    actions.initFavoriteError = jest.fn(() => {});

    apiMock
      .onPost(`/favorite/8/1`)
      .timeout();

    toggleFavoriteLoader(dispatch, getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(actions.initFavoriteError).toHaveBeenCalledTimes(1);
        expect(actions.initFavoriteError).toHaveBeenLastCalledWith();
      });
  });

  it(`Operation toggleFavorite (error)`, () => {
    const toggleFavoriteLoader = operations.toggleFavorite(8, 1);
    actions.initFavoriteError = jest.fn(() => {});

    apiMock
      .onPost(`/favorite/8/1`)
      .reply(400, {error: {code: 111, message: `any`}});

    toggleFavoriteLoader(dispatch, getState, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(actions.initFavoriteError).toHaveBeenCalledTimes(1);
        expect(actions.initFavoriteError).toHaveBeenLastCalledWith();
      });
  });
});
