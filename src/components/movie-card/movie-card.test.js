import React from "react";
import renderer from "react-test-renderer";
import MovieCard from "./movie-card.jsx";

it(`Render correctly MovieCard component`, () => {
  const videoOptionsMock = {
    poster: ``,
    isPlaying: false,
    isMuted: true,
    src: ``
  };

  const MovieCardComponent = renderer
    .create(
        <MovieCard
          id={2}
          title={`Johnny English`}
          image={`img/johnny-english.jpg`}
          titleLinkHref={`#`}
          onFilmMouseHover={jest.fn()}
          onFilmMouseLeave={jest.fn()}

          videoPlayerOptions={videoOptionsMock}
        />,
        {
          createNodeMock: (element) => {
            if (element.type === `video`) {
              return {
                src: null,
                isMuted: null,
                poster: null
              };
            }
            return null;
          }
        }
    ).toJSON();

  expect(MovieCardComponent).toMatchSnapshot();
});
