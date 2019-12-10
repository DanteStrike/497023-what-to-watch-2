import types from "./types";
import {combineReducers} from "redux";
import {updateObject} from "../../utils/object/object";

const authInitState = {
  isAuth: false,
  error: {
    isError: false,
    target: ``,
    msg: ``
  }
};
const authReducer = (state = authInitState, action) => {
  switch (action.type) {
    case types.SET_AUTH_SUCCESS:
      return updateObject(state, {isAuth: true});
    case types.SET_AUTH_REQUIRED:
      return updateObject(state, {isAuth: false});
    case types.INIT_AUTH_SERVER_ERROR:
      return updateObject(state, {error: {
        isError: true,
        target: action.payload.target,
        msg: action.payload.msg
      }});
    case types.RESET_AUTH_ERRORS:
      return updateObject(state, {error: {
        isError: false,
        target: ``,
        msg: ``
      }});
    default:
      return state;
  }
};

const userProfileInitState = {
  id: null,
  email: ``,
  name: ``,
  avatarUrl: ``,
  myListFilmsIDs: []
};
const userProfileReducer = (state = userProfileInitState, action) => {
  switch (action.type) {
    case types.SET_USER_PROFILE:
      return updateObject(state, action.payload);
    case types.SET_USER_MY_LIST:
      return updateObject(state, {myListFilmsIDs: action.payload});
    case types.CLEAR_USER_DATA:
      return userProfileInitState;
    default:
      return state;
  }
};

const favoriteRequestInitStatus = {
  isSuccess: false,
  error: {
    isError: false
  }
};
const favoriteRequestStatusReducer = (state = favoriteRequestInitStatus, action) => {
  switch (action.type) {
    case types.INIT_FAVORITE_ERROR:
      return {
        isSuccess: false,
        error: {
          isError: true
        }
      };
    case types.SET_FAVORITE_SUCCESS:
      return updateObject(state, {
        isSuccess: true
      });
    case types.RESET_FAVORITE_ERROR:
      return favoriteRequestInitStatus;
    default:
      return state;
  }
};


const myListInitStatus = {
  isMyListLoaded: false,
  isLoading: false
};
const myListStatusReducer = (state = myListInitStatus, action) => {
  switch (action.type) {
    case types.SET_MY_LIST_LOADED:
      return updateObject(state, {isMyListLoaded: true});
    case types.INIT_MY_LIST_REQUEST:
      return updateObject(state, {isLoading: true});
    case types.COMPLITE_MY_LIST_REQUEST:
      return updateObject(state, {isLoading: false});
    case types.CLEAR_USER_DATA:
      return myListInitStatus;
    default:
      return state;
  }
};

const reducer = combineReducers({
  auth: authReducer,
  data: userProfileReducer,
  toggleFavoriteStatus: favoriteRequestStatusReducer,
  myListStatus: myListStatusReducer
});

export default reducer;

