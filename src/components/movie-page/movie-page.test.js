import React from "react";
import renderer from "react-test-renderer";
import MainPage from "../main-page/main-page.jsx";

it(`Render correctly MoviePage component`, () => {
  const filmsMock = [
    {
      id: 1,
      title: `Fantastic Beasts: The Crimes of Grindelwald`,
      image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`
    }
  ];
  const component = renderer
    .create(
        <MainPage
          films={filmsMock}
        />
    ).toJSON();

  expect(component).toMatchSnapshot();
});
