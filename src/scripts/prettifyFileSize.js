const prettifyFileSize = (size) => {
  if (typeof size === 'string') size = +size;
  if (!size) return '0';
  const k = 1024;
  const sizes = ['b', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb', 'Zb', 'Yb'];
  const i = Math.floor(Math.log(size) / Math.log(k));
  return `${Number.parseFloat((size / k ** i).toFixed(2))} ${sizes[i]}`;
};

export default prettifyFileSize;
