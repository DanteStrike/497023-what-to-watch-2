import React, {cloneElement} from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {initStore} from "../../mocks/store.js";
import {Catalog} from "./catalog";

Enzyme.configure({adapter: new Adapter()});

describe(`Catalog should work correctly`, () => {
  let providerWrap;
  let component;
  const setCurrentFilterMock = jest.fn();
  const setDisplayedItemsMock = jest.fn();
  const showMoreItemsMock = jest.fn();

  beforeEach(() => {
    const store = createStore(() => initStore);
    setCurrentFilterMock.mockReset();
    setDisplayedItemsMock.mockReset();
    showMoreItemsMock.mockReset();

    providerWrap = mount(
        <Provider store={store}>
          <Catalog
            defaultFilter={`default`}
            defaultItemsAmount={10}
            increaseAmountRate={10}

            isItemsLoaded={false}
            currentFilter={`any`}
            itemsAmount={10}
            maxItemsAmount={30}
            setCurrentFilter={setCurrentFilterMock}
            setDisplayedItems={setDisplayedItemsMock}
            showMoreItems={showMoreItemsMock}
          />
        </Provider>
    );
    component = providerWrap.find(`Catalog`);
  });

  it(`Should call showMoreItems on show more button click`, () => {
    component.instance()._showMoreItems();
    expect(showMoreItemsMock).toBeCalledTimes(1);
    expect(showMoreItemsMock).toHaveBeenLastCalledWith(10, 10, 30);
  });

  it(`Should set defaultFilter on did mount`, () => {
    expect(setCurrentFilterMock).toBeCalledTimes(1);
    expect(setCurrentFilterMock).toHaveBeenLastCalledWith(`default`);
  });

  it(`Should setDisplayedItems amount on currentFilter change`, () => {
    providerWrap.setProps({
      children: cloneElement(providerWrap.props().children, {currentFilter: `another`}),
    });
    expect(setDisplayedItemsMock).toBeCalledTimes(2);
    expect(setDisplayedItemsMock).toHaveBeenLastCalledWith(10, 30);
  });
});
