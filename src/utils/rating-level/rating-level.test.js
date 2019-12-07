import {getRatingLevel} from "./rating-level";
import Enum from "../../enum";

describe(`Rating level utils should work correctly`, () => {
  it(`Util getRatingLevel`, () => {
    expect(getRatingLevel(1)).toEqual(Enum.RatingLevel.BAD);
    expect(getRatingLevel(4)).toEqual(Enum.RatingLevel.NORMAL);
    expect(getRatingLevel(5)).toEqual(Enum.RatingLevel.GOOD);
    expect(getRatingLevel(8)).toEqual(Enum.RatingLevel.VERY_GOOD);
    expect(getRatingLevel(10)).toEqual(Enum.RatingLevel.AWESOME);

    expect(() => getRatingLevel(-1)).toThrowError(`rate = -1 is out of range [0, 10]`);
    expect(() => getRatingLevel(11)).toThrowError(`rate = 11 is out of range [0, 10]`);
  });
});
