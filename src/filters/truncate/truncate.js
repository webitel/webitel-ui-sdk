const truncate = (value, length = 18) => {
  if (value) {
    if (value.length < length) return value;
    return `${value.slice(0, length - 3)}...`;
  }
  return '';
};
export default truncate;
