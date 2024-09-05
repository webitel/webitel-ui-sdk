// context === filter "this"
const valueGetter = (context) => () => {
  const { value, storedProp } = context;
  if (storedProp) return value[storedProp]; // if object and has specific prop, return this prop
  return value; // else return val
};

export default valueGetter;
