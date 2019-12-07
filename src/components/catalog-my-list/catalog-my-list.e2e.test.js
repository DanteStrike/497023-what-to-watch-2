import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {CatalogMyList} from "./catalog-my-list.jsx";

Enzyme.configure({adapter: new Adapter()});

jest.mock(`../../configs/catalog-like-this-config.js`, () => ({
  catalogLikeThisConfig: {
    defaultItemsAmount: 5
  }
}));

describe(`Component CatalogLikeThis should work correctly`, () => {
  let component;
  const initCatalogLikeThisMock = jest.fn();

  beforeEach(() => {
    initCatalogLikeThisMock.mockReset();

    component = shallow(
        <CatalogMyList
          curFilmID={1}
          curFilmGenre={`any`}
          maxItemsAmount={10}
          initCatalogLikeThis={initCatalogLikeThisMock}
        />
    );
  });

  it(`Should initialized correctly on did mount`, () => {
    expect(initCatalogLikeThisMock).toBeCalledTimes(1);
    expect(initCatalogLikeThisMock).toHaveBeenLastCalledWith(`any`, 5, 9);
  });

  it(`Should reset correctly on current page film id change`, () => {
    initCatalogLikeThisMock.mockReset();
    component.update();
    expect(initCatalogLikeThisMock).toBeCalledTimes(0);
    component.setProps({curFilmID: 2});
    expect(initCatalogLikeThisMock).toBeCalledTimes(1);
    expect(initCatalogLikeThisMock).toHaveBeenLastCalledWith(`any`, 5, 9);
  });
});
