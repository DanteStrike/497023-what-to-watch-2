import StoreNameSpace from "../store-name-space";

const getCommentsStore = (store) => store[StoreNameSpace.COMMENTS];
const getCurFilmComments = (store) => getCommentsStore(store).curFilmComments;
const getPostCommentError = (store) => getCommentsStore(store).postComment.error;
const getPostCommentStatus = (store) => getCommentsStore(store).postComment.isSuccess;

export default {
  getCurFilmComments,
  getPostCommentError,
  getPostCommentStatus
};
