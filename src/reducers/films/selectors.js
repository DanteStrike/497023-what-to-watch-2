import {createSelector} from "reselect";

const getAllIDs = (store) => store.films.data.allIDs;
const getFilmsByID = (store) => store.films.data.byID;

const getCardsInfo = createSelector(
    [getAllIDs, getFilmsByID],
    (allIDs, films) => allIDs.map((filmID) => ({
      id: films[filmID].id,
      name: films[filmID].name,
      preview: films[filmID].preview,
    }))
);


export default {
  getAllIDs,
  getFilmsByID,
  getCardsInfo
};
