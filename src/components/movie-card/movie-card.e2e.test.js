import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movie-card.jsx";

Enzyme.configure({adapter: new Adapter()});

describe(`MovieCard should work correctly`, () => {
  let component;
  const onTimerStart = jest.fn();
  const onTimerReset = jest.fn();
  const renderTrailerPreview = jest.fn();

  beforeEach(() => {
    onTimerStart.mockReset();
    onTimerReset.mockReset();
    renderTrailerPreview.mockReset();

    component = shallow(
        <MovieCard
          id={1}
          name={`Johnny English`}
          image={`img/johnny-english.jpg`}
          onTimerStart={onTimerStart}
          onTimerReset={onTimerReset}
          renderTrailerPreview={renderTrailerPreview}
        />
    );
  });

  it(`Should callback timer start on mouse enter`, () => {
    component.simulate(`mouseenter`);
    expect(onTimerStart).toBeCalledTimes(1);
  });

  it(`Should callback timer reset on mouse leave`, () => {
    component.simulate(`mouseleave`);
    expect(onTimerReset).toBeCalledTimes(1);
  });

  it(`Should render preview player`, () => {
    expect(renderTrailerPreview).toBeCalledTimes(1);
  });
});
