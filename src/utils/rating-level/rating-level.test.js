import {getRatingLevel} from "./rating-level";

describe(`Rating level utils should work correctly`, () => {
  it(`Util getRatingLevel`, () => {
    expect(getRatingLevel(1)).toEqual(`Bad`);
    expect(getRatingLevel(4)).toEqual(`Normal`);
    expect(getRatingLevel(5)).toEqual(`Good`);
    expect(getRatingLevel(8)).toEqual(`Very good`);
    expect(getRatingLevel(10)).toEqual(`Awesome`);

    expect(() => getRatingLevel(-1)).toThrowError(`rate = -1 is out of range [0, 10]`);
    expect(() => getRatingLevel(11)).toThrowError(`rate = 11 is out of range [0, 10]`);
  });
});
