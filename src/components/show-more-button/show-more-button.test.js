import React from "react";
import renderer from "react-test-renderer";
import ShowMoreButton from "./show-more-button.jsx";


it(`Render correctly ShowMoreButton component`, () => {
  const component = renderer
    .create(
        <ShowMoreButton
          onShowMoreButtonClick={jest.fn()}
        />
    ).toJSON();

  expect(component).toMatchSnapshot();
});
