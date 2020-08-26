const truncateFromEnd = (value, length = 18) => {
  if (value) {
    if (value.length < length) return value;
    return `...${value.slice(value.length - (length - 3))}`;
  }
  return '';
};
export default truncateFromEnd;
