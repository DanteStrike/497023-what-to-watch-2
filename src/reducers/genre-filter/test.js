import types from "./types.js";
import utils from "./utils.js";
import actions from "./actions.js";
import selectors from "./selectors.js";
import reducer from "./reducers.js";
import mocks from "./mocks";

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
    const spyCollectState = jest.spyOn(utils, `collectState`);

    expect(actions.setupFilterState([])).toEqual({
      type: types.SETUP_FILTER_STATE,
      payload: {
        genres: new Set([`All genre`]),
        byGenres: {
          "All genre": []
        }
      }
    });

    expect(spyCollectState).toBeCalledTimes(1);
  });

  it(`Action setCurrentFilter`, () => {
    expect(actions.setCurrentFilter(`genre`)).toEqual({
      type: types.SET_CURRENT_FILTER,
      payload: `genre`
    });
  });
});

describe(`Reducers: GenreFilter reducers`, () => {
  it(`Reducer filterReducer`, () => {
    const action = {
      type: types.SET_CURRENT_FILTER,
      payload: `anyGenre`
    };

    expect(reducer(mocks.genreFilterStore, action)).toEqual({
      currentFilter: `anyGenre`,
      data: {
        genres: [`All genre`, `genreOne`, `genreTwo`],
        byGenres: {
          "All genre": [1, 2, 3, 4],
          "genreOne": [2, 4],
          "genreTwo": [1, 3]
        }
      }
    });
  });

  it(`Reducer setupReducer`, () => {
    const action = {
      type: types.SETUP_FILTER_STATE,
      payload: {
        genres: [`All genre new`, `genreOne new`, `genreTwo new`],
        byGenres: {
          "All genre": [5, 6, 7, 8],
          "genreOne": [5, 6],
          "genreTwo": [7, 8]
        }
      }
    };

    expect(reducer(mocks.genreFilterStore, action)).toEqual({
      currentFilter: utils.ALL_GENRE,
      data: {
        genres: [`All genre new`, `genreOne new`, `genreTwo new`],
        byGenres: {
          "All genre": [5, 6, 7, 8],
          "genreOne": [5, 6],
          "genreTwo": [7, 8]
        }
      }
    });
  });

  it(`Reducer should return state on empty action`, () => {
    expect(reducer(mocks.genreFilterStore, {})).toEqual(mocks.genreFilterStore);
  });
});

describe(`Reducers: GenreFilter selectors`, () => {
  it(`Selector getCurrentFilter`, () => {
    expect(selectors.getCurrentFilter(mocks.store)).toEqual(`All genre`);
  });

  it(`Selector getCurrentFilterFilmsIDs`, () => {
    expect(selectors.getCurrentFilterFilmsIDs(mocks.store)).toEqual([1, 2, 3, 4]);
  });
});
