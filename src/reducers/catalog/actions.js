import types from "./types.js";


const showMoreFilms = (currentAmount, increaseRate, maxAmount) => {
  return {
    type: types.SHOW_MORE_FILMS,
    payload: (currentAmount + increaseRate < maxAmount) ?
      increaseRate :
      maxAmount - currentAmount
  };
};

const setDisplayedFilmsAmount = (amount, maxAmount) => ({
  type: types.SET_DISPLAYED_FILMS_AMOUNT,
  payload: (amount < maxAmount) ?
    amount :
    maxAmount
});

export default {
  showMoreFilms,
  setDisplayedFilmsAmount
};
