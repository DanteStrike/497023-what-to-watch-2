import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

it(`render correctly App component`, () => {
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

  const AppComponent = renderer
    .create(
        <App
          moviesList = {moviesMockList}
        />
    ).toJSON();

  expect(AppComponent).toMatchSnapshot();
});
