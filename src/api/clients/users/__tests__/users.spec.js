import axios from 'axios';
import UsersAPI from '../users';

// axios mock should be copy-pasted :(
// https://stackoverflow.com/questions/65554910/jest-referenceerror-cannot-access-before-initialization
vi.mock('axios', () => {
  return {
    default: {
      post: vi.fn(),
      get: vi.fn(),
      delete: vi.fn(),
      put: vi.fn(),
      patch: vi.fn(),
      create: vi.fn().mockReturnThis(),
      interceptors: {
        request: {
          use: vi.fn(), eject: vi.fn(),
        }, response: {
          use: vi.fn(), eject: vi.fn(),
        },
      },
    },
  };
});

describe('UsersAPI', () => {
  it('correctly computes "getList" method api call', async () => {
    const inputParams = {
      fields: ['id', 'name', 'vitest'],
    };
    const url = '/users?fields=id&fields=name&fields=vitest&page=1&size=10';
    const mock = axios.get.mockImplementationOnce(() => Promise.resolve({
      data: {},
    }));
    await UsersAPI.getList(inputParams);
    expect(mock).toHaveBeenCalledWith(url);
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
      ], next: true,
    };

    const response = {
      data: {
        items: [
          { id: 1, should_case_convert: '' },
        ], next: true,
      },
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(response));
    expect(await UsersAPI.getList({})).toEqual(output);
  });

  it('correctly computes "get" method api call', async () => {
    const inputParams = {
      itemId: 1,
    };
    const url = '/users/1';
    const mock = axios.get.mockImplementationOnce(() => Promise.resolve({
      data: {},
    }));
    await UsersAPI.get(inputParams);
    expect(mock).toHaveBeenCalledWith(url);
  });

  it('correctly computes "get" method output', async () => {
    const output = {
      id: 1, device: {}, devices: [], license: [], roles: [], variables: [
        {
          key: '', value: '',
        },
      ],
    };

    const response = {
      data: {
        id: 1,
      },
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(response));
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
    const mock = axios.post.mockImplementationOnce(() => Promise.resolve({
      data: {},
    }));
    await UsersAPI.add(input);
    expect(mock).toHaveBeenCalledWith(url, body);
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
    axios.post.mockImplementationOnce(() => Promise.resolve(response));
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
    const mock = axios.put.mockImplementationOnce(() => Promise.resolve({
      data: {},
    }));
    await UsersAPI.update(input);
    expect(mock).toHaveBeenCalledWith(url, body);
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
    axios.put.mockImplementationOnce(() => Promise.resolve(response));
    expect(await UsersAPI.update({ itemInstance: {}, itemId: 1 }))
    .toEqual(output);
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
    const mock = axios.patch.mockImplementationOnce(() => Promise.resolve({
      data: {},
    }));
    await UsersAPI.patch(input);
    expect(mock).toHaveBeenCalledWith(url, body);
  });

  it('correctly computes "delete" method api call', async () => {
    const input = {
      id: 1,
    };

    const url = '/users/1?permanent=true';
    const mock = axios.delete.mockImplementationOnce(() => Promise.resolve({
      data: {},
    }));
    await UsersAPI.delete(input);
    expect(mock).toHaveBeenCalledWith(url);
  });
});
