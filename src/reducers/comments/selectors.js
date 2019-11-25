import StoreNameSpace from "../store-name-space";

const getCurFilmComments = (store) => store[StoreNameSpace.COMMENTS].curFilmComments;

export default {
  getCurFilmComments
};
