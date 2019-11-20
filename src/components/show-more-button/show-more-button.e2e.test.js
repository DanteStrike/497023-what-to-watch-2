import React from "react";
import Enzyme, {shallow} from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";
import ShowMoreButton from "./show-more-button.jsx";

Enzyme.configure({adapter: new Adapter()});

describe(`Show more button should work correctly`, () => {
  it(`Should callback on button click`, () => {
    const onButtonClickMock = jest.fn();
    const component = shallow(
        <ShowMoreButton onShowMoreButtonClick={onButtonClickMock}/>
    );

    component.find(`button`).simulate(`click`);
    expect(onButtonClickMock).toBeCalledTimes(1);
  });
});
