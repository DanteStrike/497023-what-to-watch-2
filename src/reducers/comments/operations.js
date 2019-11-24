const loadCurFilmComments = (curFilmID) => (dispatch, _, api) => {
  return api.get(`/comments/${curFilmID}`)
    .then((response) => {
      dispatch(commentsActions.loadCurFilmComments(response.data));
    });
};
