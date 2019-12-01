import types from "./types";
import {combineReducers} from "redux";
import {updateObject} from "../../utils/object/object";

const authInitState = {
  isAuth: false,
  error: {
    isError: false,
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
        msg: action.payload
      }});
    case types.RESET_AUTH_ERRORS:
      return updateObject(state, {error: {
        isError: false,
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
    case types.SET_USER_MYLIST:
      return updateObject(state, {myListFilmsIDs: action.payload});
    case types.CLEAR_USER_DATA:
      return {
        id: null,
        email: ``,
        name: ``,
        avatarUrl: ``,
        myListFilmsIDs: []
      };
    default:
      return state;
  }
};

const reducer = combineReducers({
  auth: authReducer,
  data: userProfileReducer
});

export default reducer;

