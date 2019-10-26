import React from "react";
import renderer from "react-test-renderer";
import Catalog from "./catalog.jsx";

it(`render correctly Catalog component`, () => {
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

  const CatalogComponent = renderer
    .create(
        <Catalog
          films={filmsMock}
        />
    ).toJSON();

  expect(CatalogComponent).toMatchSnapshot();
});
