import StoreNameSpace from "../store-name-space.js";
import {filmsSelectors} from "../films/films";
import {createSelector} from "reselect";

const getStoreSpace = (store) => store[StoreNameSpace.APP];
const getIsReady = (store) => getStoreSpace(store).isReady;
const getVideoPlayerFilmID = (store) => getStoreSpace(store).videoPlayerFilmID;
const getSetupAppError = (store) => getStoreSpace(store).setupAppError;
const getIsEdgeBrowser = (store) => getStoreSpace(store).isEdgeBrowser;
const getVideoPlayerInfo = createSelector(
    filmsSelectors.getFilmsByIDs,
    getVideoPlayerFilmID,
    (films, id) => films[id].videoSrc
);

export default {
  getStoreSpace,
  getIsReady,
  getVideoPlayerFilmID,
  getVideoPlayerInfo,
  getSetupAppError,
  getIsEdgeBrowser
};


