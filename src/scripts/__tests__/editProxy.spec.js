import editProxy from '../editProxy';

describe('editProxy', () => {
  it('correctly updates _dirty prop at object property change', () => {
    const object = editProxy({ value: 'jest', _dirty: false });
    object.value = 'upd jest';
    expect(object._dirty).toBe(true);
  });
});
