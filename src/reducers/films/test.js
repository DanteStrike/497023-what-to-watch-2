import utils from "./utils.js";

describe(`Reducers: Films utils`, () => {
  describe(`Transform RAW server data`, () => {
    const filmsRAW = [
      {
        "id": 1,
        "name": `filmOne`,
        "poster_image": `img/filmOne-poster.jpg`,
        "preview_image": `img/filmOne.jpg`,
        "background_image": `img/filmOne.jpg`,
        "background_color": `#ffffff`,
        "video_link": `https://some-linkOne`,
        "preview_video_link": `https://some-linkOne`,
        "description": `Some text filmOne`,
        "rating": 1.0,
        "scores_count": 1,
        "director": `directorOne`,
        "starring": [`actorOne`, `actorTwo`],
        "run_time": 1,
        "genre": `genreOne`,
        "released": 2019,
        "is_favorite": false,
      },
      {
        "id": 2,
        "name": `filmTwo`,
        "poster_image": `img/filmTwo-poster.jpg`,
        "preview_image": `img/filmTwo.jpg`,
        "background_image": `img/filmTwo.jpg`,
        "background_color": `#000000`,
        "video_link": `https://some-linkTwo`,
        "preview_video_link": `https://some-linkTwo`,
        "description": `Some text filmTwo`,
        "rating": 2.0,
        "scores_count": 2,
        "director": `directorTwo`,
        "starring": [`actorThree`, `actorFour`],
        "run_time": 2,
        "genre": `genreTwo`,
        "released": 2020,
        "is_favorite": true,
      }
    ];

    const adaptedFilmsData = [
      {
        id: 1,
        name: `filmOne`,
        posterImage: `img/filmOne-poster.jpg`,
        preview: {
          image: `img/filmOne.jpg`,
          videoSrc: `https://some-linkOne`
        },
        background: {
          image: `img/filmOne.jpg`,
          color: `#ffffff`
        },
        videoSrc: `https://some-linkOne`,
        description: `Some text filmOne`,
        rating: 1.0,
        scoresCount: 1,
        director: `directorOne`,
        starring: [`actorOne`, `actorTwo`],
        runTime: 1,
        genre: `genreOne`,
        released: 2019,
        isFavorite: false,
      }, {
        id: 2,
        name: `filmTwo`,
        posterImage: `img/filmTwo-poster.jpg`,
        preview: {
          image: `img/filmTwo.jpg`,
          videoSrc: `https://some-linkTwo`
        },
        background: {
          image: `img/filmTwo.jpg`,
          color: `#000000`
        },
        videoSrc: `https://some-linkTwo`,
        description: `Some text filmTwo`,
        rating: 2.0,
        scoresCount: 2,
        director: `directorTwo`,
        starring: [`actorThree`, `actorFour`],
        runTime: 2,
        genre: `genreTwo`,
        released: 2020,
        isFavorite: true,
      }
    ];

    const normolizedFilmsData = {
      byID: {
        "1": adaptedFilmsData[0],
        "2": adaptedFilmsData[1]
      },
      allIDs: [1, 2]
    };

    it(`Util adaptFilmRawData`, () => {
      const filmRAW = filmsRAW[0];
      const adaptedFilmData = adaptedFilmsData[0];

      expect(utils.adaptFilmRAW(filmRAW)).toEqual(adaptedFilmData);
    });

    it(`Util adaptFilmsRAW`, () => {
      expect(utils.adaptFilmsRAW(filmsRAW)).toEqual(adaptedFilmsData);
      expect(utils.adaptFilmsRAW([])).toEqual([]);
    });

    it(`Util normolizeFilm`, () => {
      expect(utils.normolizeFilms(adaptedFilmsData)).toEqual(normolizedFilmsData);
      expect(utils.normolizeFilms([])).toEqual({
        byID: {},
        allIDs: []
      });
    });

    it(`Util transformFilmsRAW`, () => {
      expect(utils.transformFilmsRAW(filmsRAW)).toEqual(normolizedFilmsData);
      expect(utils.transformFilmsRAW([])).toEqual({
        byID: {},
        allIDs: []
      });
    });
  });
});
