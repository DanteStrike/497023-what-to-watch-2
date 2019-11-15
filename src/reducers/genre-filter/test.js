import types from "./types.js";
import utils from "./utils.js";
import actions from "./actions.js";

describe(`Reducers: GenreFilter utils`, () => {
  it(`Util collectState`, () => {
    const filmsGenres = [{
      id: 1,
      genre: `genreThree`,
    }, {
      id: 3,
      genre: `genreOne`,
    }, {
      id: 5,
      genre: `genreThree`
    }, {
      id: 6,
      genre: `genreOne`
    }, {
      id: 10,
      genre: `genreTwo`
    }];

    expect(utils.collectState(filmsGenres)).toEqual({
      genres: new Set([`All genre`, `genreThree`, `genreOne`, `genreTwo`]),
      byGenres: {
        "All genre": [1, 3, 5, 6, 10],
        "genreOne": [3, 6],
        "genreTwo": [10],
        "genreThree": [1, 5]
      }
    });

    expect(utils.collectState([])).toEqual({
      genres: new Set([`All genre`]),
      byGenres: {
        "All genre": []
      }
    });
  });
});

describe(`Reducers: GenreFilter actions`, () => {
  it(`Action setupFilterState`, () => {
    expect(actions.setupFilterState()).toEqual({
      type: types.SETUP_FILTER_STATE,
      payload: {
        genres: new Set([`All genre`]),
        byGenres: {
          "All genre": []
        }
      }
    });
  });
});
