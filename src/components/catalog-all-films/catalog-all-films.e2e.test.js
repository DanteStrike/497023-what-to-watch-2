import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {CatalogAllFilms} from "./catalog-all-films.jsx";

Enzyme.configure({adapter: new Adapter()});

describe(`Component CatalogAllFilms should work correctly`, () => {
  let component;
  const setCurrentFilterMock = jest.fn();
  const setDisplayedItemsMock = jest.fn();
  const showMoreItemsMock = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();

    component = shallow(
        <CatalogAllFilms
          currentFilter={`any`}
          itemsAmount={8}
          maxItemsAmount={30}
          setCurrentFilter={setCurrentFilterMock}
          setDisplayedItems={setDisplayedItemsMock}
          showMoreItems={showMoreItemsMock}
        />
    );
  });

  it(`Should initialized correctly on did mount`, () => {
    expect(setCurrentFilterMock).toBeCalledTimes(1);
    expect(setCurrentFilterMock).toHaveBeenLastCalledWith(`All genre`);
    expect(setDisplayedItemsMock).toBeCalledTimes(1);
    expect(setDisplayedItemsMock).toHaveBeenLastCalledWith(8, 30);
  });

  it(`Should call showMoreItems on button click`, () => {
    component.instance()._showMoreItems();
    expect(showMoreItemsMock).toBeCalledTimes(1);
    expect(showMoreItemsMock).toHaveBeenLastCalledWith(8, 20, 30);
  });

  it(`Should reset displayed items on currentFilter change`, () => {
    setDisplayedItemsMock.mockReset();
    component.setProps({itemsAmount: 11});
    expect(setDisplayedItemsMock).toBeCalledTimes(0);
    component.setProps({currentFilter: `other`});
    expect(setDisplayedItemsMock).toBeCalledTimes(1);
    expect(setDisplayedItemsMock).toHaveBeenLastCalledWith(8, 30);
  });

  it(`Should unrender button on maxItemsDisplayed reach`, () => {
    expect(component.find(`ShowMoreButton`)).toHaveLength(1);
    component.setProps({itemsAmount: 31});
    expect(component.find(`ShowMoreButton`)).toHaveLength(0);
  });
});
