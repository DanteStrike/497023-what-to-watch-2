import React from "react";
import renderer from "react-test-renderer";
import Catalog from "./catalog.jsx";

it(`render correctly Catalog component`, () => {
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

  const CatalogComponent = renderer
    .create(
        <Catalog
          moviesList = {moviesMockList}
        />
    ).toJSON();

  expect(CatalogComponent).toMatchSnapshot();
});
