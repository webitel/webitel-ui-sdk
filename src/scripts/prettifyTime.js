const prettifyTime = (time) => {
  let date;
  if (time instanceof Date) date = time;
  else if (typeof time === 'number') date = new Date(time);
  else date = new Date(+time);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export default prettifyTime;
