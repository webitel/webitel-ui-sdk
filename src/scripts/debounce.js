import lodashDebounce from 'lodash/debounce.js';

const debounce = (
  fn,
  wait = 1000,
  options,
) => lodashDebounce(fn, wait, options);

export default debounce;
