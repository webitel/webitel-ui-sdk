import updateObject from '../updateObject';

describe('updateObject', () => {
  it('doesn\'t mutate original object', () => {
    const original = { jest: 'jest' };
    updateObject({ obj: original, path: 'jest', value: '123' });
    expect(original.jest).toBe('jest');
  });
  it('changes shallow value', () => {
    const original = { jest: 'jest' };
    const result = { jest: 'huest' };
    expect(updateObject({ obj: original, path: 'jest', value: 'huest' }))
    .toEqual(result);
  });
  it('changes deep value', () => {
    const original = { jest: { deep: 'jest' } };
    const result = { jest: { deep: 'huest' } };
    expect(updateObject({ obj: original, path: 'jest.deep', value: 'huest' }))
    .toEqual(result);
  });
});
