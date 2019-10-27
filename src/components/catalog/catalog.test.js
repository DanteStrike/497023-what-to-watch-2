import React from "react";
import renderer from "react-test-renderer";
import Catalog from "./catalog.jsx";

it(`Render correctly Catalog component`, () => {
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
        <Catalog
          films={filmsMock}
        />
    ).toJSON();

  expect(component).toMatchSnapshot();
});
