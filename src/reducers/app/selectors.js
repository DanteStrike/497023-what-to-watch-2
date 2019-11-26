import StoreNameSpace from "../store-name-space.js";
import {filmsSelectors} from "../films";
import {createSelector} from "reselect";

const getStoreSpace = (store) => store[StoreNameSpace.APP];
const getIsReady = (store) => getStoreSpace(store).isReady;
const getVideoPlayerFilmID = (store) => getStoreSpace(store).videoPlayerFilmID;
const getVideoPlayerInfo = createSelector(
    filmsSelectors.getFilmsByIDs,
    getVideoPlayerFilmID,
    (films, id) => (films[id] !== undefined) ? {
      poster: films[id].background.image,
      src: films[id].videoSrc
    } : {}
);

export default {
  getStoreSpace,
  getIsReady,
  getVideoPlayerFilmID,
  getVideoPlayerInfo
};


