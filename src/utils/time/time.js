import {Time} from "../enum.js";


export const formatTimeToHM = (time = 0) => {
  const hours = Math.floor(time / Time.MINUTES_IN_HOUR);
  const minutes = time - hours * Time.MINUTES_IN_HOUR;

  return `${(hours !== 0) ? `${hours}h` : ``}${(hours !== 0 && minutes !== 0) ? ` ` : ``}${(minutes !== 0) ? `${minutes}m` : ``}`;
};

export const formatDateForReview = (timestamp = 0) => {
  const date = new Date(timestamp);
  const monthName = date.toLocaleString(`en-us`, {month: `long`});
  const month = date.toLocaleString(`en-us`, {month: `2-digit`});
  const day = date.toLocaleString(`en-us`, {day: `2-digit`});
  const year = date.getFullYear();

  return {
    dateTime: `${year}-${month}-${day}`,
    view: `${monthName} ${day}, ${year}`
  };
};
