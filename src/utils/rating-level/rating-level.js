import Constants from "../../constants";

export const getRatingLevel = (rate) => {
  switch (true) {
    case (rate >= Constants.RatingLevel.Bad.MIN_VALUE && rate < Constants.RatingLevel.Bad.MAX_VALUE):
      return Constants.RatingLevel.Bad.TITLE;
    case (rate >= Constants.RatingLevel.Normal.MIN_VALUE && rate < Constants.RatingLevel.Normal.MAX_VALUE):
      return Constants.RatingLevel.Normal.TITLE;
    case (rate >= Constants.RatingLevel.Good.MIN_VALUE && rate < Constants.RatingLevel.Good.MAX_VALUE):
      return Constants.RatingLevel.Good.TITLE;
    case (rate >= Constants.RatingLevel.VeryGood.MIN_VALUE && rate < Constants.RatingLevel.VeryGood.MAX_VALUE):
      return Constants.RatingLevel.VeryGood.TITLE;
    case (rate === Constants.RatingLevel.Awesome.VALUE):
      return Constants.RatingLevel.Awesome.TITLE;
    default:
      throw new Error(`rate = ${rate} is out of range [0, 10]`);
  }
};
