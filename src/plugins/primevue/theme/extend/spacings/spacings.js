const spacings = {
  multiplicator: '8px',

  '3xs': 'calc({spacings.multiplicator} / 4)',
  '2xs': 'calc({spacings.multiplicator} / 2)',
  xs: 'calc({spacings.multiplicator} * 1)',
  sm: 'calc({spacings.multiplicator} * 2)',
  md: 'calc({spacings.multiplicator} * 3)',
  lg: 'calc({spacings.multiplicator} * 4)',
  xl: 'calc({spacings.multiplicator} * 5)',
  '2xl': 'calc({spacings.multiplicator} * 6)',
  '3xl': 'calc({spacings.multiplicator} * 7)',
};

export default spacings;
