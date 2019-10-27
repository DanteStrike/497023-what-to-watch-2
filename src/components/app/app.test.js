import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

it(`render correctly App component`, () => {
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

  const component = renderer
    .create(
        <App
          films={filmsMock}
        />
    ).toJSON();

  expect(component).toMatchSnapshot();
});
