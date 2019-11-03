import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movie-card.jsx";

Enzyme.configure({adapter: new Adapter()});

describe(`Callbacks to parent`, () => {
  const videoOptionsMock = {
    poster: ``,
    isPlaying: false,
    isMuted: true,
    src: ``
  };

  it(`should callback to parent component film ID on mouse over`, () => {
    const onFilmMouseHover = jest.fn();
    const component = shallow(
        <MovieCard
          id={2}
          title=""
          image=""
          titleLinkHref={`#`}
          onFilmMouseHover={onFilmMouseHover}
          onFilmMouseLeave={jest.fn()}

          videoPlayerOptions={videoOptionsMock}
        />
    );

    component.simulate(`mouseenter`);
    expect(onFilmMouseHover).toBeCalledWith(2);
  });

  it(`should callback to parent component on mouse out`, () => {
    const onFilmMouseLeave = jest.fn();
    const component = shallow(
        <MovieCard
          id={2}
          title=""
          image=""
          titleLinkHref={`#`}
          onFilmMouseHover={jest.fn()}
          onFilmMouseLeave={onFilmMouseLeave}

          videoPlayerOptions={videoOptionsMock}
        />
    );

    component.simulate(`mouseleave`);
    expect(onFilmMouseLeave).toBeCalled();
  });
});
