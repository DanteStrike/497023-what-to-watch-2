import actions from "./actions";

const loadCurFilmComments = (curFilmID) => (dispatch, _, api) => {
  return api.get(`/comments/${curFilmID}`)
    .then((response) => {
      dispatch(actions.loadCurFilmComments(response.data));
    });
};

const postUserComment = (curFilmID, score, comment) => (dispatch, _, api) => {
  return api.post(`/comments/${curFilmID}`,
      {
        rating: score,
        comment
      })
    .then((response) => {
      dispatch(actions.loadCurFilmComments(response.data));
      dispatch(actions.setPostCommentSuccess());
    })
    .catch((err) => {
      if (err.code === `ECONNABORTED`) {
        dispatch(actions.initPostCommentError(err.message));
        return;
      }

      if (err.response) {
        dispatch(actions.initPostCommentError(err.response.data.error));
      }
    });
};

export default {
  loadCurFilmComments,
  postUserComment
};

