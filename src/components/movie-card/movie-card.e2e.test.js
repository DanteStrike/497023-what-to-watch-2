import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movie-card.jsx";

Enzyme.configure({adapter: new Adapter()});

it(`check click callback on MovieCard title`, () => {
  const clickHandler = jest.fn();
  const MovieCardComponent = shallow(
      <MovieCard
        title = {`Johnny English`}
        image = {`img/johnny-english.jpg`}
        onMovieTitleClick = {clickHandler}
      />
  );

  const movieTitle = MovieCardComponent.find(`.small-movie-card__link`);
  movieTitle.simulate(`click`);
  expect(clickHandler).toHaveBeenCalled();
});
