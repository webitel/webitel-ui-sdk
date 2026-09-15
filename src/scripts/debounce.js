import { debounce as lodashDebounce } from 'lodash-es';

const debounce = (fn, options, wait = 1000) =>
	lodashDebounce(fn, wait, options);

export default debounce;
