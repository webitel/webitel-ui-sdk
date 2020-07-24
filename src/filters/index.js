import Vue from 'vue';
import truncate from './truncate/truncate';
import truncateFromEnd from './truncate/truncateFromEnd';

const Filters = {
  truncate,
  truncateFromEnd,
};

Object.keys(Filters).forEach((name) => {
  Vue.filter(name, Filters[name]);
});

export default Filters;
