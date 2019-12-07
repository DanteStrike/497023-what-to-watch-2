import Enum from "../../enum";

export const getRatingLevel = (rate) => {
  switch (true) {
    case (rate >= 0 && rate < 3):
      return Enum.RatingLevel.BAD;
    case (rate >= 3 && rate < 5):
      return Enum.RatingLevel.NORMAL;
    case (rate >= 5 && rate < 8):
      return Enum.RatingLevel.GOOD;
    case (rate >= 8 && rate < 10):
      return Enum.RatingLevel.VERY_GOOD;
    case (rate === 10):
      return Enum.RatingLevel.AWESOME;
    default:
      throw new Error(`rate = ${rate} is out of range [0, 10]`);
  }
};
