import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movie-card.jsx";

Enzyme.configure({adapter: new Adapter()});

it(`should callback to parent component film ID on mouse over`, () => {
  const onFilmMouseOver = jest.fn();
  const component = shallow(
      <MovieCard
        id={2}
        title={``}
        image={``}
        onFilmMouseOver={onFilmMouseOver}
        onFilmMouseOut={jest.fn()}
      />
  );

  component.simulate(`mouseover`);
  expect(onFilmMouseOver).toBeCalledWith(2);
});

it(`should callback to parent component on mouse out`, () => {
  const onFilmMouseOut = jest.fn();
  const component = shallow(
      <MovieCard
        id={2}
        title={``}
        image={``}
        onFilmMouseOver={jest.fn()}
        onFilmMouseOut={onFilmMouseOut}
      />
  );

  component.simulate(`mouseout`);
  expect(onFilmMouseOut).toBeCalled();
});
