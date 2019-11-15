const adaptFilmRawData = (filmRAW) => ({
  id: filmRAW[`id`],
  name: filmRAW[`name`],
  posterImage: filmRAW[`poster_image`],
  preview: {
    image: filmRAW[`preview_image`],
    videoSrc: filmRAW[`preview_video_link`]
  },
  background: {
    image: filmRAW[`background_image`],
    color: filmRAW[`background_color`]
  },
  videoSrc: filmRAW[`video_link`],
  description: filmRAW[`description`],
  rating: filmRAW[`rating`],
  scoresCount: filmRAW[`scores_count`],
  director: filmRAW[`director`],
  starring: filmRAW[`starring`],
  runTime: filmRAW[`run_time`],
  genre: filmRAW[`genre`],
  released: filmRAW[`released`],
  isFavorite: filmRAW[`is_favorite`],
});

export default {
  adaptFilmRawData
};
