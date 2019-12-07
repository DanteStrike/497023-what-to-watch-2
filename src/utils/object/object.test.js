import {updateObject} from "./object.js";

describe(`Objects utils should work correctly`, () => {
  it(`updateObject`, () => {
    expect(updateObject({old: `old`}, {new: `new`})).toEqual({
      old: `old`,
      new: `new`
    });

    expect(updateObject({
      any: `any`,
      some: `old`
    }, {
      some: `new`
    })).toEqual({
      any: `any`,
      some: `new`
    });

    expect(updateObject({}, {
      some: `new`
    })).toEqual({
      some: `new`
    });

    expect(updateObject({}, {})).toEqual({});

    expect(updateObject({one: `one`}, {two: `two`}, {three: `three`}, {more: `more`}))
      .toEqual({
        one: `one`,
        two: `two`,
        three: `three`,
        more: `more`
      });
  });
});
