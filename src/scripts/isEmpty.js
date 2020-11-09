// checks if value is Falsy,
// including empty arrays or objects
const isEmpty = (value) => {
  if (Array.isArray(value)) return !value.length;
  if (typeof value === 'object') return !value || !Object.keys(value).length;
  return !value;
};

export default isEmpty;
