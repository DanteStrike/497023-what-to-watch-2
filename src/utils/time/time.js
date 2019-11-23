export const Time = {
  MILLISECONDS_IN_SECOND: 1000,
  MINUTES_IN_HOUR: 60
};

export const formatTimeToHM = (time) => {
  const hours = Math.floor(time / Time.MINUTES_IN_HOUR);
  const minutes = time - hours * Time.MINUTES_IN_HOUR;

  return `${hours}h ${minutes}m`;
};
