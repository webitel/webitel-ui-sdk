const convertDuration = (duration) => {
  if (!duration) return '00:00:00';

  let hour = `${Math.floor(duration / 3600)}`;
  let min = `${Math.floor((duration % 3600) / 60)}`;
  let sec = `${Math.floor((duration % 3600) % 60)}`;

  if (hour.length === 1) hour = `0${hour}`;
  if (min.length === 1) min = `0${min}`;
  if (sec.length === 1) sec = `0${sec}`;

  return `${hour}:${min}:${sec}`;
};

export default convertDuration;
