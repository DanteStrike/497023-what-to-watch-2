import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {GenreList} from "./genre-list.jsx";

Enzyme.configure({adapter: new Adapter()});

describe(`GenreList should work correctly`, () => {
  it(`Should switch genre correctly`, () => {
    const preventDefault = jest.fn();
    const onGenreChange = jest.fn();
    const component = shallow(
        <GenreList
          currentFilter="All genre"
          genres={[`All genre`, `others`]}
          filterGenre="All genre"
          onGenreChange={onGenreChange}
        />
    );

    component.find(`.catalog__genres-item`).at(1).find(`.catalog__genres-link`).simulate(`click`, {preventDefault});
    expect(preventDefault).toBeCalledTimes(1);
    expect(onGenreChange).toBeCalledTimes(1);
    expect(onGenreChange).toHaveBeenNthCalledWith(1, `others`);
  });

  it(`Should render max 9 genres + "All genre"`, () => {
    const component = shallow(
        <GenreList
          currentFilter="All genre"
          genres={[`All genre`, `genre-1`, `genre-2`, `genre-3`, `genre-4`, `genre-5`, `genre-6`, `genre-7`, `genre-8`, `genre-9`, `genre-10`]}
          filterGenre="All genre"
          onGenreChange={jest.fn()}
        />
    );

    expect(component.find(`.catalog__genres-link`)).toHaveLength(10);
  });
});
