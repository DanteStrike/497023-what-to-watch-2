import Constants from "../../constants";

export const getRatingLevel = (rate) => {
  switch (true) {
    case (rate >= 0 && rate < 3):
      return Constants.RatingLevel.BAD;
    case (rate >= 3 && rate < 5):
      return Constants.RatingLevel.NORMAL;
    case (rate >= 5 && rate < 8):
      return Constants.RatingLevel.GOOD;
    case (rate >= 8 && rate < 10):
      return Constants.RatingLevel.VERY_GOOD;
    case (rate === 10):
      return Constants.RatingLevel.AWESOME;
    default:
      throw new Error(`rate = ${rate} is out of range [0, 10]`);
  }
};
