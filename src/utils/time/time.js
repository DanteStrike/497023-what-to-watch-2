import Constants from "../../constants.js";


export const formatTimeToHM = (time = 0) => {
  const hours = Math.floor(time / Constants.Time.MINUTES_IN_HOUR);
  const minutes = time - hours * Constants.Time.MINUTES_IN_HOUR;

  return `${(hours !== 0) ? `${hours}h` : ``}${(hours !== 0 && minutes !== 0) ? ` ` : ``}${(minutes !== 0) ? `${minutes}m` : ``}`;
};

export const formatDateForReview = (timestamp = 0) => {
  const date = new Date(timestamp);
  const monthName = date.toLocaleString(`en-us`, {month: `long`});
  const month = date.toLocaleString(`en-us`, {month: `2-digit`});
  const day = date.getDate();
  const dayTwoDigit = date.toLocaleString(`en-us`, {day: `2-digit`});
  const year = date.getFullYear();

  return {
    dateTime: `${year}-${month}-${dayTwoDigit}`,
    view: `${monthName} ${day}, ${year}`
  };
};

export const twoDigitView = (number = 0) => {
  if (number < 0 || number > 99 || !Number.isInteger(number)) {
    throw new Error(`number is out of range [0, 99] and must be integer`);
  }

  return (number >= 10) ? `${number}` : `0${number}`;
};

export const formatTimeForPlayer = (time = 0) => {
  const hours = Math.floor(time / Constants.Time.SECONDS_IN_HOUR);
  const minutes = Math.floor((time - hours * Constants.Time.SECONDS_IN_HOUR) / Constants.Time.SECONDS_IN_MINUTE);
  const seconds = Math.floor(time - hours * Constants.Time.SECONDS_IN_HOUR - minutes * Constants.Time.SECONDS_IN_MINUTE);

  return `${twoDigitView(hours)}:${twoDigitView(minutes)}:${twoDigitView(seconds)}`;
};
