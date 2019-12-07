import types from "./types.js";
import {combineReducers} from "redux";
import {updateObject} from "../../utils/object/object";

const loadCommentsReducer = (state = [], action) => {
  if (action.type === types.LOAD_CUR_FILM_COMMENTS) {
    return action.payload;
  }

  return state;
};

const postCommentInitState = {
  isSuccess: false,
  error: {
    isError: false,
    msg: ``
  }
};
const postCommentReducer = (state = postCommentInitState, action) => {
  switch (action.type) {
    case types.INIT_POST_COMMENT_ERROR:
      return {
        isSuccess: false,
        error: {
          isError: true,
          msg: action.payload
        }
      };
    case types.SET_POST_COMMENT_SUCCESS:
      return updateObject(state, {
        isSuccess: true,
      });
    case types.RESET_POST_COMMENT:
      return {
        isSuccess: false,
        error: {
          isError: false,
          msg: ``
        }
      };
    default:
      return state;
  }
};

const reducer = combineReducers({
  curFilmComments: loadCommentsReducer,
  postCommentState: postCommentReducer
});

export default reducer;
