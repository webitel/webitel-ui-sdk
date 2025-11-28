import { formatDate } from '../utils'

const prettifyTime = (time) => {
  let date;
  if (time instanceof Date) date = time;
  else if (typeof time === 'number') date = new Date(time);
  else date = new Date(+time);

  return formatDate(date, 'time');
};

export default prettifyTime;
