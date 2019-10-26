import React from "react";
import renderer from "react-test-renderer";
import MainPage from "./main-page.jsx";

it(`render correctly MainPage component`, () => {
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

  const MainPageComponent = renderer
    .create(
        <MainPage
          films={filmsMock}
        />
    ).toJSON();

  expect(MainPageComponent).toMatchSnapshot();
});
