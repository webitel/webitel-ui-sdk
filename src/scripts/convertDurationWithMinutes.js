const convertDurationWithMinutes = (duration) => {
  if (!duration) return '00:00';

  let hour = `${Math.floor(duration / 60)}`;
  let min = `${Math.floor(duration % 60)}`;

  if (hour.length === 1) hour = `0${hour}`;
  if (min.length === 1) min = `0${min}`;

  return `${hour}:${min}`;
};

export default convertDurationWithMinutes;
