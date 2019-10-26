import React from "react";
import renderer from "react-test-renderer";
import MoviesList from "./movies-list.jsx";

it(`render correctly MoviesList component`, () => {
  const filmsMock = [
    {
      id: 1,
      title: `Johnny English`,
      image: `img/johnny-english.jpg`
    },
    {
      id: 2,
      title: `Shutter Island`,
      image: `img/shutter-island.jpg`
    }
  ];

  const MoviePreviewComponent = renderer
    .create(
        <MoviesList
          films={filmsMock}
        />
    ).toJSON();

  expect(MoviePreviewComponent).toMatchSnapshot();
});
