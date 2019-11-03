import React from "react";
import Enzyme, {shallow, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MoviesList from "./movies-list.jsx";

Enzyme.configure({adapter: new Adapter()});

describe(`Should change state: {activeFilmId} correctly`, () => {
  it(`First init activeFilmId should be null`, () => {
    const component = shallow(
        <MoviesList
          films={[]}
        />
    );

    expect(component.state(`activeFilmId`)).toBeNull();
  });

  it(`Should set activeFilmId to film id on hover`, () => {
    const filmsMock = [
      {
        id: 4,
        title: ``,
        image: ``,
        previewSrc: ``
      }
    ];
    const component = mount(
        <MoviesList
          films={filmsMock}
        />
    );

    const movieCard = component.find(`.small-movie-card`);
    expect(movieCard.exists()).toEqual(true);

    movieCard.simulate(`mouseenter`);
    expect(component.state(`activeFilmId`)).toBe(4);

    movieCard.simulate(`mouseleave`);
    expect(component.state(`activeFilmId`)).toBeNull();
  });
});
