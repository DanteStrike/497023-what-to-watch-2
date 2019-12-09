import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SetupAppPage from "./setup-app-page.jsx";

Enzyme.configure({adapter: new Adapter()});

describe(`Component SetupAppPage should work correctly`, () => {
  it(`Shouldnt render error on loading`, () => {
    const setupAppErrorMock = {
      isError: false
    };
    const component = shallow(
        <SetupAppPage setupAppError={setupAppErrorMock} onRepeatSetupClick={jest.fn()}/>
    );

    expect(component.find(`.user-page__content`)).toHaveLength(0);
  });
});
