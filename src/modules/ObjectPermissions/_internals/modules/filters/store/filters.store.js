import deepCopy from 'deep-copy';
import FiltersStoreModule
  from '../../../../../Filters/store/FiltersStoreModule';

const filtersList = [
  {
    name: 'page',
    value: 1,
  },
  {
    name: 'size',
    value: 10,
  },
  { name: 'sort' },
];

export default () => {
  const filters = new FiltersStoreModule()
  .addFilter(deepCopy(filtersList))
  .getModule();

  return filters;
};
