const valueSetter = (context) => (newValue) => {
  context.value = newValue;
  return context;
};

export default valueSetter;
