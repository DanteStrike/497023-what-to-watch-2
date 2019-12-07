import StoreNameSpace from "../store-name-space";

const getCommentsStore = (store) => store[StoreNameSpace.COMMENTS];
const getCurFilmComments = (store) => getCommentsStore(store).curFilmComments;
const getPostCommentError = (store) => getCommentsStore(store).postCommentState.error;
const getPostCommentStatus = (store) => getCommentsStore(store).postCommentState.isSuccess;

export default {
  getCurFilmComments,
  getPostCommentError,
  getPostCommentStatus
};
