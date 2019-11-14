import FilmAdapter from "./films-adapter";


describe(`Server FilmAdapter`, () => {
  const serverFilmsMock = [
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

  const serverFilmMock = serverFilmsMock[0];

  it(`FilmAdapter should transform server data to app valid`, () => {
    const FilmAdapterMock = new FilmAdapter(serverFilmMock).getFilm();
  });
});
