import { listResponseHandler } from '../defaults.js';

describe('filter api Defaults', () => {
  it('listResponseHandler returns only lookups from response', () => {
    const response = {
      items: [
        { name: 'jest1', id: 1, myField: '1' },
        { name: 'jest2', id: 2, obj: [] },
      ],
      next: true,
    };
    const expectedResult = [
      { name: 'jest1', id: 1 },
      { name: 'jest2', id: 2 },
    ];
    expect(listResponseHandler(response)).toEqual(expectedResult);
  });
});
