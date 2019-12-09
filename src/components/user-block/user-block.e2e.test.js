import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {UserBlock} from "./user-block.jsx";

Enzyme.configure({adapter: new Adapter()});

describe(`Component UserBlock should work correctly`, () => {
  it(`Should render avatar on user auth`, () => {
    const component = shallow(
        <UserBlock isAuth={true} avatarUrl="url"/>
    );

    expect(component.find(`.user-block__avatar`)).toHaveLength(1);
  });
});
