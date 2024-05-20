// context === filter "this"
const valueGetter = (context) => () => {
  const { value, storedProp, multiple } = context;
  if (multiple) return value.map((item) => item[storedProp]); // if arr, map
  if (storedProp) return value[storedProp]; // if object and has specific prop, return this prop
  return value; // else return val
}

export default valueGetter;
