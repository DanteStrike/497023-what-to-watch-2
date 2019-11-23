export const films = [
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
    id: 3,
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
