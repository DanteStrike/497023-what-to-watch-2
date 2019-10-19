import React from "react";
import renderer from "react-test-renderer";
import MainPage from "./main-page.jsx";

it(`render correctly MainPage component`, () => {
  const moviesMockList = [
    {
      title: `Johnny English`,
      image: `img/johnny-english.jpg`
    },
    {
      title: `Shutter Island`,
      image: `img/shutter-island.jpg`
    }
  ];

  const MainPageComponent = renderer
    .create(
        <MainPage
          moviesList = {moviesMockList}
        />
    ).toJSON();

  expect(MainPageComponent).toMatchSnapshot();
});
