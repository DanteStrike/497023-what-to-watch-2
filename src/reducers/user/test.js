import types from "./types.js";
import StoreNameSpace from "../store-name-space";
import actions from "./actions.js";
import operations from "./operations.js";
import selectors from "./selectors.js";
import reducer from "./reducers.js";
import utils from "./utils";
import configureAPI from "../../server/configure-API";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import * as storeMock from "../../mocks/store.js";
import * as filmsMock from "../../mocks/films.js";

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

  it(`Action initAuthServerError`, () => {
    expect(actions.initAuthServerError(`error`)).toEqual({
      type: types.INIT_AUTH_SERVER_ERROR,
      payload: `error`
    });
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
      type: types.SET_USER_MYLIST,
      payload: [1, 2]
    });
    expect(utils.getIDsList).toHaveBeenCalledTimes(1);
  });

  it(`Action clearUserData`, () => {
    expect(actions.clearUserData([`any`, `any`])).toEqual({
      type: types.CLEAR_USER_DATA,
    });
  });
});

describe(`Reducers: User operations`, () => {
  const api = configureAPI();
  const dispatch = jest.fn();
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

  it(`Operation sentAuthRequest manual cancel`, () => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const sentAuthLoader = operations.sentAuthRequest(`correct`, `correct`, source);
    actions.initAuthServerError = jest.fn(() => {});

    apiMock
      .onPost(`/login`)
      .reply(200, {profile: `any`});

    source.cancel(`MANUAL CANCEL`);

    sentAuthLoader(dispatch, _, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(0);
        expect(actions.initAuthServerError).toHaveBeenCalledTimes(0);
      });
  });

  it(`Operation getMyListFilms`, () => {
    const myListLoader = operations.getMyListFilms();
    actions.setUserMyList = jest.fn(() => {});

    apiMock
      .onGet(`/favorite`)
      .reply(200, [{favoriteFilm: `raw`}, {favoriteFilm: `raw`}]);

    myListLoader(dispatch, _, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(actions.setUserMyList).toHaveBeenCalledTimes(1);
        expect(actions.setUserMyList).toHaveBeenLastCalledWith([{favoriteFilm: `raw`}, {favoriteFilm: `raw`}]);
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
          msg: `any`
        }
      });
    });
    it(`Should init error correctly`, () => {
      const action = {
        type: types.INIT_AUTH_SERVER_ERROR,
        payload: `errorMsg`
      };

      expect(reducer(initState, action).auth).toEqual({
        isAuth: false,
        error: {
          isError: true,
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
        type: types.SET_USER_MYLIST,
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
});

describe(`Reducers: User selectors`, () => {
  it(`Selector getIsAuth`, () => {
    expect(selectors.getIsAuth(storeMock.loadedStore)).toEqual(true);
  });

  it(`Selector getAuthError`, () => {
    expect(selectors.getAuthError(storeMock.loadedStore)).toEqual({
      isError: true,
      msg: `any`
    });
  });

  it(`Selector getAvatarUrl`, () => {
    expect(selectors.getAvatarUrl(storeMock.loadedStore)).toEqual(`img/1.png`);
  });
});
