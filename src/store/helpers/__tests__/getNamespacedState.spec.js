import getNamespacedState from '../getNamespacedState';

describe('getNamespacedState', () => {
  const searchedValue = 'jest!';
  const state = { lvl1: { lvl2: { lvl3: searchedValue } } };

  it('correctly returns nested object values', () => {
    const namespace = 'lvl1/lvl2/lvl3';
    expect(getNamespacedState(state, namespace)).toBe(searchedValue);
  });
});
