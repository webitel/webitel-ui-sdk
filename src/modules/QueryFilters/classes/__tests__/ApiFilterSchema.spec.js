import ApiFilterSchema from '../ApiFilterSchema';

describe('Api Filter Schema', () => {
  const getListMock = jest.fn();
  beforeEach(() => {
    getListMock.mockClear();
  });
  it('creates default class without passed params', () => {
    const filter = new ApiFilterSchema();
    expect(filter).toBeTruthy();
  });
  it('calls API getList() method at search()', () => {
    const params = { page: 1 };
    const filter = new ApiFilterSchema({ API: { getList: getListMock } });
    filter.search(params);
    expect(getListMock).toHaveBeenCalledWith(params);
  });
  it('calls API getList() method at fetchSelected()', () => {
    const idsList = [1];
    const expectedParams = { size: 1, ids: [1] };
    const filter = new ApiFilterSchema({ API: { getList: getListMock } });
    filter.fetchSelected(idsList);
    expect(getListMock).toHaveBeenCalledWith(expectedParams);
  });
});
