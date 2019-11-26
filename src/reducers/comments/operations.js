import actions from "./actions";

const loadCurFilmComments = (curFilmID) => (dispatch, _, api) => {
  return api.get(`/comments/${curFilmID}`)
    .then((response) => {
      dispatch(actions.loadCurFilmComments(response.data));
    });
};

export default {
  loadCurFilmComments
};

