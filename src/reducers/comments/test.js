import types from "./types.js";
import StoreNameSpace from "../store-name-space";
import utils from "./utils.js";
import actions from "./actions.js";
import operations from "./operations.js";
import reducer from "./reducers.js";
import selectors from "./selectors.js";
import {commentsRAW, comments} from "../../mocks/comments.js";
import configureAPI from "../../configure-API.js";
import MockAdapter from "axios-mock-adapter";
import * as storeMock from "../../mocks/store.js";

describe(`Reducers: Comments utils`, () => {
  describe(`Transform RAW server data`, () => {
    it(`Util adaptComment`, () => {
      expect(utils.adaptComment(commentsRAW[0])).toEqual(comments[0]);
    });

    it(`Util adaptComments`, () => {
      expect(utils.adaptComments(commentsRAW)).toEqual(comments);
    });

    it(`Util sortByNewDate`, () => {
      const dates = [{date: 100}, {date: 10}, {date: 120}];
      const sortedDates = [{date: 120}, {date: 100}, {date: 10}];

      expect(utils.sortByNewDate(dates)).toEqual(sortedDates);
    });
  });
});

describe(`Reducers: Comments actions`, () => {
  it(`Action loadCurFilmComments`, () => {
    utils.adaptComments = jest.fn(() => [`Adapted`]);
    utils.sortByNewDate = jest.fn((res) => [`Sorted and ${res[0]}`]);
    expect(actions.loadCurFilmComments(`RAW`)).toEqual({
      type: types.LOAD_CUR_FILM_COMMENTS,
      payload: [`Sorted and Adapted`]
    });
  });

  it(`Action initPostCommentError`, () => {
    expect(actions.initPostCommentError(`errorMsg`)).toEqual({
      type: types.INIT_POST_COMMENT_ERROR,
      payload: `errorMsg`
    });
  });

  it(`Action setPostCommentSuccess`, () => {
    expect(actions.setPostCommentSuccess()).toEqual({
      type: types.SET_POST_COMMENT_SUCCESS,
    });
  });

  it(`Action resetPostCommentError`, () => {
    expect(actions.resetPostCommentError()).toEqual({
      type: types.RESET_POST_COMMENT,
    });
  });
});

describe(`Reducers: Comments operations`, () => {
  const api = configureAPI();
  const dispatch = jest.fn();
  const _ = jest.fn();
  const curFilmID = 1;

  let apiMock;
  beforeEach(() => {
    jest.resetAllMocks();
    apiMock = new MockAdapter(api);
  });

  it(`Operation loadCurFilmComments`, () => {
    const loader = operations.loadCurFilmComments(curFilmID);
    actions.loadCurFilmComments = jest.fn(() => {});

    apiMock
      .onGet(`/comments/${curFilmID}`)
      .reply(200, [{comment: `comment for curFilmID (RAW)`}]);

    loader(dispatch, _, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(actions.loadCurFilmComments).toHaveBeenCalledTimes(1);
        expect(actions.loadCurFilmComments).toHaveBeenLastCalledWith([{comment: `comment for curFilmID (RAW)`}]);
      });
  });

  it(`Operation postUserComment (success)`, () => {
    const loader = operations.postUserComment(curFilmID);
    actions.loadCurFilmComments = jest.fn(() => {});
    actions.setPostCommentSuccess = jest.fn(() => {});
    actions.initPostCommentError = jest.fn(() => {});

    apiMock
      .onPost(`/comments/${curFilmID}`)
      .reply(200, [{comment: `comment for curFilmID (RAW)`}]);

    loader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(actions.loadCurFilmComments).toHaveBeenCalledTimes(1);
        expect(actions.loadCurFilmComments).toHaveBeenLastCalledWith([{comment: `comment for curFilmID (RAW)`}]);
        expect(actions.setPostCommentSuccess).toHaveBeenCalledTimes(1);
      });
  });

  it(`Operation postUserComment (error)`, () => {
    const loader = operations.postUserComment(curFilmID);
    actions.initPostCommentError = jest.fn(() => {});

    apiMock
      .onPost(`/comments/${curFilmID}`)
      .reply(400, {error: {code: 111, message: `any`}});

    loader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(actions.initPostCommentError).toHaveBeenCalledTimes(1);
        expect(actions.initPostCommentError).toHaveBeenLastCalledWith({code: 111, message: `any`});
      });
  });

  it(`Operation postUserComment (timeout)`, () => {
    const loader = operations.postUserComment(curFilmID);
    actions.initPostCommentError = jest.fn(() => {});

    apiMock
      .onPost(`/comments/${curFilmID}`)
      .timeout();

    loader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(actions.initPostCommentError).toHaveBeenCalledTimes(1);
        expect(actions.initPostCommentError).toHaveBeenLastCalledWith(`timeout of 5000ms exceeded`);
      });
  });
});

describe(`Reducers: Comments reducer`, () => {
  const initState = storeMock.initStore[StoreNameSpace.COMMENTS];
  const loadedStore = storeMock.loadedStore[StoreNameSpace.COMMENTS];

  describe(`Reducer loadCommentsReducer`, () => {
    it(`Should return state on default`, () => {
      expect(reducer(initState, {})).toEqual(initState);
    });

    it(`Should set new comments for curFilm`, () => {
      const action = {
        type: types.LOAD_CUR_FILM_COMMENTS,
        payload: [{data: `any`}]
      };

      expect(reducer(initState, action).curFilmComments).toEqual([{data: `any`}]);
    });
  });

  describe(`Reducer postCommentReducer`, () => {
    it(`Should init post error`, () => {
      const action = {
        type: types.INIT_POST_COMMENT_ERROR,
        payload: `test`
      };
      expect(reducer(initState, action).postCommentState).toEqual({
        isSuccess: false,
        error: {
          isError: true,
          msg: `test`
        }
      });
    });

    it(`Should set post success`, () => {
      const action = {
        type: types.SET_POST_COMMENT_SUCCESS,
      };
      expect(reducer(initState, action).postCommentState).toEqual({
        isSuccess: true,
        error: {
          isError: false,
          msg: ``
        }
      });
    });

    it(`Should reset post`, () => {
      const action = {
        type: types.RESET_POST_COMMENT,
      };
      expect(reducer(loadedStore, action).postCommentState).toEqual({
        isSuccess: false,
        error: {
          isError: false,
          msg: ``
        }
      });
    });
  });
});

describe(`Reducers: Comments selector`, () => {
  it(`Selector getCurFilmComments`, () => {
    expect(selectors.getCurFilmComments(storeMock.loadedStore)).toEqual(storeMock.loadedStore[StoreNameSpace.COMMENTS].curFilmComments);
  });

  it(`Selector getPostCommentError`, () => {
    expect(selectors.getPostCommentError(storeMock.loadedStore)).toEqual(storeMock.loadedStore[StoreNameSpace.COMMENTS].postCommentState.error);
  });

  it(`Selector getPostCommentStatus`, () => {
    expect(selectors.getPostCommentStatus(storeMock.loadedStore)).toEqual(storeMock.loadedStore[StoreNameSpace.COMMENTS].postCommentState.isSuccess);
  });
});
