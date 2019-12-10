import {getRatingLevel} from "./rating-level";
import Constants from "../../constants";

describe(`Rating level utils should work correctly`, () => {
  it(`Util getRatingLevel`, () => {
    expect(getRatingLevel(1)).toEqual(Constants.RatingLevel.BAD);
    expect(getRatingLevel(4)).toEqual(Constants.RatingLevel.NORMAL);
    expect(getRatingLevel(5)).toEqual(Constants.RatingLevel.GOOD);
    expect(getRatingLevel(8)).toEqual(Constants.RatingLevel.VERY_GOOD);
    expect(getRatingLevel(10)).toEqual(Constants.RatingLevel.AWESOME);

    expect(() => getRatingLevel(-1)).toThrowError(`rate = -1 is out of range [0, 10]`);
    expect(() => getRatingLevel(11)).toThrowError(`rate = 11 is out of range [0, 10]`);
  });
});
