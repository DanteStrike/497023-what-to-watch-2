import {createSelector} from "reselect";

const getAllIDs = (store) => store.films.data.allIDs;
const getFilmsByIDs = (store) => store.films.data.byIDs;

const getCardsInfo = createSelector(
    [getAllIDs, getFilmsByIDs],
    (allIDs, films) => allIDs.map((filmID) => ({
      id: films[filmID].id,
      name: films[filmID].name,
      preview: films[filmID].preview,
    }))
);

const getAllFilmsGenres = createSelector(
    [getAllIDs, getFilmsByIDs],
    (allIDs, films) => allIDs.map((filmID) => ({
      id: films[filmID].id,
      genre: films[filmID].genre
    }))
);


export default {
  getAllIDs,
  getFilmsByIDs,
  getCardsInfo,
  getAllFilmsGenres
};
