import ApiFilterSchema from '../ApiFilterSchema.js';

describe('Api Filter Schema', () => {
  const APIMock = vi.fn();
  beforeEach(() => {
    APIMock.mockClear();
  });
  it('creates default class without passed params', () => {
    const filter = new ApiFilterSchema();
    expect(filter).toBeTruthy();
  });
  it('calls API getList() method at search()', () => {
    const params = { page: 1 };
    const filter = new ApiFilterSchema({ API: APIMock });
    filter.search(params);
    expect(APIMock).toHaveBeenCalledWith(params);
  });
  it('calls API getList() method at fetchSelected()', () => {
    const idsList = [1];
    const expectedParams = { size: 1, id: [1] };
    const filter = new ApiFilterSchema({ API: APIMock });
    filter.fetchSelected(idsList);
    expect(APIMock).toHaveBeenCalledWith(expectedParams);
  });
});
