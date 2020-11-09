import * as sortQueryAdapters from '../sortQueryAdapters';

test('sortToQueryAdapter', () => {
  expect(sortQueryAdapters.sortToQueryAdapter('asc')).toBe('+');
  expect(sortQueryAdapters.sortToQueryAdapter('desc')).toBe('-');
  expect(sortQueryAdapters.sortToQueryAdapter(null)).toBe('');
});
test('queryToSortAdapter', () => {
  expect(sortQueryAdapters.queryToSortAdapter('+')).toBe('asc');
  expect(sortQueryAdapters.queryToSortAdapter('-')).toBe('desc');
  expect(sortQueryAdapters.queryToSortAdapter('')).toBe(null);
});
