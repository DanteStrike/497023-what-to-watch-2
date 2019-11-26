import types from "./types.js";
import StoreNameSpace from "../store-name-space";
import utils from "./utils.js";
import actions from "./actions.js";
import operations from "./operations.js";
import reducer from "./reducers.js";
import selectors from "./selectors.js";
import {commentsRAW, comments} from "../../mocks/comments.js";
import configureAPI from "../../server/configure-API.js";
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
});

describe(`Reducers: Comments operations`, () => {
  it(`Operation loadCurFilmComments`, () => {
    const api = configureAPI();
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const curFilmID = 1;
    const loader = operations.loadCurFilmComments(curFilmID);

    const spyOnLoad = jest.spyOn(actions, `loadCurFilmComments`);
    spyOnLoad.mockReturnValue({
      type: types.LOAD_CUR_FILM_COMMENTS,
      payload: [{comment: `comment for curFilmID`}]
    });

    apiMock
      .onGet(`/comments/${curFilmID}`)
      .reply(200, [{comment: `comment for curFilmID (RAW)`}]);

    loader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: types.LOAD_CUR_FILM_COMMENTS,
          payload: [{comment: `comment for curFilmID`}]
        });
      });
  });
});

describe(`Reducers: Comments reducer`, () => {
  const initState = storeMock.initStore[StoreNameSpace.COMMENTS];

  describe(`Reducer loadCommentsReducer`, () => {
    it(`Should return state on default`, () => {
      expect(reducer(initState, {})).toEqual(initState);
    });

    it(`Should set new comments for curFilm`, () => {
      const action = {
        type: types.LOAD_CUR_FILM_COMMENTS,
        payload: [{data: `any`}]
      };

      expect(reducer(initState, action)).toEqual({
        curFilmComments: [{data: `any`}]
      });
    });
  });
});

describe(`Reducers: Comments selector`, () => {
  it(`Selector getCurFilmComments`, () => {
    expect(selectors.getCurFilmComments(storeMock.loadedStore)).toEqual(storeMock.loadedStore[StoreNameSpace.COMMENTS].curFilmComments);
  });
});
