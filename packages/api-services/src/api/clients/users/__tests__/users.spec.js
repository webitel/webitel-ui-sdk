import axiosMock from '../../../../tests/mocks/axiosMock.js';

const instanceMock = axiosMock()().default;

vi.doMock('../../../defaults/getDefaultInstance/getDefaultInstance.js', () => ({
  default: () => instanceMock,
}));

describe('UsersAPI', () => {
  beforeEach(() => {
    Object.assign(instanceMock, axiosMock()().default);
  });

  it('correctly computes "getList" method api call', async () => {
    const get = vi.fn(() =>
      Promise.resolve({
        data: {},
      }),
    );

    instanceMock.get = get;

    const UsersAPI = (await import('../users.js')).default;

    const inputParams = {
      fields: ['id', 'name', 'vitest'],
    };
    const url = '/users?fields=id&fields=name&fields=vitest&page=1&size=10';
    await UsersAPI.getList(inputParams);
    expect(get).toHaveBeenCalledWith(url);
  });

  it('correctly computes "getList" method output', async () => {
    const output = {
      items: [
        {
          dnd: false,
          id: 1,
          name: '',
          state: true,
          status: '',
          shouldCaseConvert: '',
        },
      ],
      next: true,
    };

    const response = {
      data: {
        items: [{ id: 1, should_case_convert: '' }],
        next: true,
      },
    };

    const get = vi.fn(() => Promise.resolve(response));

    instanceMock.get = get;

    const UsersAPI = (await import('../users.js')).default;

    expect(await UsersAPI.getList({})).toEqual(output);
  });

  it('correctly computes "get" method api call', async () => {
    const inputParams = {
      itemId: 1,
    };
    const url = '/users/1';

    const get = vi.fn(() =>
      Promise.resolve({
        data: {},
      }),
    );

    instanceMock.get = get;

    const UsersAPI = (await import('../users.js')).default;

    await UsersAPI.get(inputParams);
    expect(get).toHaveBeenCalledWith(url);
  });

  it('correctly computes "get" method output', async () => {
    const output = {
      id: 1,
      device: {},
      devices: [],
      license: [],
      roles: [],
      variables: [
        {
          key: '',
          value: '',
        },
      ],
    };

    const response = {
      data: {
        id: 1,
      },
    };

    const get = vi.fn(() => Promise.resolve(response));

    instanceMock.get = get;

    const UsersAPI = (await import('../users.js')).default;

    expect(await UsersAPI.get({})).toEqual(output);
  });

  it('correctly computes "add" method api call', async () => {
    const input = {
      itemInstance: {
        name: 'test',
      },
    };

    const body = {
      name: 'test',
      profile: {}, // variables field (?)
    };

    const url = '/users';

    const post = vi.fn(() =>
      Promise.resolve({
        data: {},
      }),
    );

    instanceMock.post = post;

    const UsersAPI = (await import('../users.js')).default;

    await UsersAPI.add(input);
    expect(post).toHaveBeenCalledWith(url, body);
  });

  it('correctly computes "add" method output', async () => {
    const output = {
      id: 1,
      checkCase: '',
    };

    const response = {
      data: {
        id: 1,
        check_case: '',
      },
    };

    const post = vi.fn(() => Promise.resolve(response));

    instanceMock.post = post;

    const UsersAPI = (await import('../users.js')).default;

    expect(await UsersAPI.add({ itemInstance: {} })).toEqual(output);
  });

  it('correctly computes "update" method api call', async () => {
    const input = {
      itemInstance: {
        name: 'test',
      },
      itemId: 1,
    };

    const body = {
      name: 'test',
      profile: {}, // variables field (?)
    };

    const url = '/users/1';

    const put = vi.fn(() =>
      Promise.resolve({
        data: {},
      }),
    );

    instanceMock.put = put;

    const UsersAPI = (await import('../users.js')).default;

    await UsersAPI.update(input);
    expect(put).toHaveBeenCalledWith(url, body);
  });

  it('correctly computes "update" method output', async () => {
    const output = {
      id: 1,
      checkCase: '',
    };

    const response = {
      data: {
        id: 1,
        check_case: '',
      },
    };

    const put = vi.fn(() => Promise.resolve(response));

    instanceMock.put = put;

    const UsersAPI = (await import('../users.js')).default;

    expect(await UsersAPI.update({ itemInstance: {}, itemId: 1 })).toEqual(
      output,
    );
  });

  it('correctly computes "patch" method api call', async () => {
    const input = {
      changes: {
        name: 'test',
      },
      id: 1,
    };

    const body = {
      name: 'test',
    };

    const url = '/users/1';

    const patch = vi.fn(() =>
      Promise.resolve({
        data: {},
      }),
    );

    instanceMock.patch = patch;

    const UsersAPI = (await import('../users.js')).default;

    await UsersAPI.patch(input);
    expect(patch).toHaveBeenCalledWith(url, body);
  });

  it('correctly computes "delete" method api call', async () => {
    const input = {
      id: 1,
    };

    const url = '/users/1?permanent=true';

    const _delete = vi.fn(() =>
      Promise.resolve({
        data: {},
      }),
    );

    instanceMock.delete = _delete;

    const UsersAPI = (await import('../users.js')).default;

    await UsersAPI.delete(input);
    expect(_delete).toHaveBeenCalledWith(url);
  });
});
