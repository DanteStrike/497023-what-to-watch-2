import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {GenreList} from "./genre-list.jsx";

Enzyme.configure({adapter: new Adapter()});

describe(`GenreList should work correctly`, () => {
  it(``, () => {
    const preventDefault = jest.fn();
    const onGenreChange = jest.fn();
    const component = shallow(
        <GenreList
          currentFilter={`All genre`}
          genres={[`All genre`, `others`]}
          filterGenre={`All genre`}
          onGenreChange={onGenreChange}
        />
    );

    component.find(`.catalog__genres-item`).at(1).find(`.catalog__genres-link`).simulate(`click`, {preventDefault});
    expect(preventDefault).toBeCalledTimes(1);
    expect(onGenreChange).toBeCalledTimes(1);
    expect(onGenreChange).toHaveBeenNthCalledWith(1, `others`);
  });
});
