import isEmpty from '../isEmpty';

describe('isEmpty', () => {
  it('falsy cases (not empty)', () => {
    expect(isEmpty(['jest'])).toBeFalsy();
    expect(isEmpty({ jest: 'jest' })).toBeFalsy();
    expect(isEmpty(1)).toBeFalsy();
    expect(isEmpty('jest')).toBeFalsy();
  });
  it('truthy cases (empty)', () => {
    expect(isEmpty([])).toBeTruthy();
    expect(isEmpty({})).toBeTruthy();
    expect(isEmpty(0)).toBeTruthy();
    expect(isEmpty('')).toBeTruthy();
  });
});
