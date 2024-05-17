function valueGetter() {
  const { value, storedProp, multiple } = this;
  if (multiple) return value.map((item) => item[storedProp]); // if arr, map
  if (storedProp) return value[storedProp]; // if object and has specific prop, return this prop
  return value; // else return val
}

export default valueGetter;
