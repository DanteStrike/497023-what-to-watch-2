import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {CatalogMyList} from "./catalog-my-list.jsx";

Enzyme.configure({adapter: new Adapter()});

describe(`Component CatalogLikeThis should work correctly`, () => {
  let component;
  const loadMyListMock = jest.fn();
  const myListState = {
    isMyListLoaded: false,
    isLoading: false
  };

  beforeEach(() => {
    jest.resetAllMocks();

    component = shallow(
        <CatalogMyList loadMyList={loadMyListMock} myListState={myListState}/>
    );
  });

  it(`Call load on mount if isMyListLoaded = false`, () => {
    expect(loadMyListMock).toHaveBeenCalledTimes(1);
  });

  it(`Should show msg if cant download list`, () => {
    expect(component.find(`p`)).toHaveLength(1);
    component.setProps({myListState: {
      isMyListLoaded: true,
      isLoading: false
    }});
    expect(component.find(`p`)).toHaveLength(0);
    component.setProps({myListState: {
      isMyListLoaded: false,
      isLoading: true
    }});
    expect(component.find(`p`)).toHaveLength(0);
  });

  it(`Shouldnt load list if isMyListLoaded = true`, () => {
    jest.resetAllMocks();
    component = shallow(
        <CatalogMyList loadMyList={loadMyListMock} myListState={{
          isMyListLoaded: true,
          isLoading: false
        }}/>
    );
    expect(loadMyListMock).not.toHaveBeenCalled();
  });
});
