import types from "./types";
import utils from "./utils";

const loadCurFilmComments = (commentsRAW) => {
  return {
    type: types.LOAD_CUR_FILM_COMMENTS,
    payload: utils.sortByNewDate(utils.adaptComments(commentsRAW))
  };
};

export default {
  loadCurFilmComments
};
