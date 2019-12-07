import types from "./types";
import utils from "./utils";

const loadCurFilmComments = (commentsRAW) => {
  return {
    type: types.LOAD_CUR_FILM_COMMENTS,
    payload: utils.sortByNewDate(utils.adaptComments(commentsRAW))
  };
};

const initPostCommentError = (errMsg) => {
  return {
    type: types.INIT_POST_COMMENT_ERROR,
    payload: errMsg
  };
};

const setPostCommentSuccess = () => {
  return {
    type: types.SET_POST_COMMENT_SUCCESS
  };
};

const resetPostCommentError = () => {
  return {
    type: types.RESET_POST_COMMENT
  };
};

export default {
  loadCurFilmComments,
  initPostCommentError,
  resetPostCommentError,
  setPostCommentSuccess
};
