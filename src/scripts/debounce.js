import lodashDebounce from 'lodash/debounce.js';

const debounce = (fn, options, wait = 1000) => lodashDebounce(fn, wait, options);

export default debounce;
