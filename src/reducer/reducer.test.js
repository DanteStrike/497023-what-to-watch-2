import {reducer, filterFilmsByGenre, ActionCreator} from "./reducer.js";
import {films} from "../mocks/films.js";

describe(`Reducer should work correctly`, () => {
  const state = {
    filterGenre: ``,
    filteredFilms: []
  };

  it(`Should return state on wrong or empty call`, () => {
    expect(reducer()).toMatchObject(state);

    const action = {
      type: `incorrect action`,
      payload: 9999
    };
    expect(reducer(state, action)).toMatchObject(state);
  });

  it(`Should change filterGenre by given value`, () => {
    const action = {
      type: `SET_GENRE_FILTER`,
      payload: `someGenreType`
    };
    expect(reducer(state, action)).toMatchObject({
      filterGenre: `someGenreType`,
      filteredFilms: []
    });
  });

  it(`Should change filteredFilms by new filtered films list`, () => {
    const action = {
      type: `SET_FILTERED_FILMS`,
      payload: [
        {
          id: 1,
          title: `Film1`
        },
        {
          id: 2,
          title: `Film1`
        }
      ]
    };
    expect(reducer(state, action)).toMatchObject({
      filterGenre: ``,
      filteredFilms: [
        {
          id: 1,
          title: `Film1`
        },
        {
          id: 2,
          title: `Film1`
        }
      ]
    });
  });
});

describe(`Filtering films by given genre should work correctly`, () => {
  const filmsMock = films;
  it(`Should filter films be given genre (At least one film has this genre)`, () => {
    const filteredFilms = filterFilmsByGenre(filmsMock, `Comedy`);
    expect(filteredFilms).toHaveLength(1);
    filteredFilms.forEach((film) => {
      expect(film).toMatchObject({
        genre: `Comedy`
      });
    });
  });

  it(`Should return empty array (No one film has this genre)`, () => {
    const filteredFilms = filterFilmsByGenre(filmsMock, `Incorrect genre`);
    expect(filteredFilms).toHaveLength(0);
  });
});

describe(`ActionCreator should work correctly`, () => {
  const filmsMock = films;
  it(`On set new genre should return action set genre filter`, () => {
    expect(ActionCreator.setGenreFilter(`someGenreType`)).toMatchObject({
      type: `SET_GENRE_FILTER`,
      payload: `someGenreType`
    });
  });

  it(`On filter films (genre !== All genre) should return action with payload = filteredFilms by given genre`, () => {
    const filteredFilms = filterFilmsByGenre(filmsMock, `Drama`);
    expect(ActionCreator.filterFilms(filmsMock, `Drama`)).toMatchObject({
      type: `SET_FILTERED_FILMS`,
      payload: filteredFilms
    });
  });

  it(`On filter films (genre === All genre) should return action with payload = films`, () => {
    expect(ActionCreator.filterFilms(filmsMock, `All genre`)).toMatchObject({
      type: `SET_FILTERED_FILMS`,
      payload: filmsMock
    });
  });
});
