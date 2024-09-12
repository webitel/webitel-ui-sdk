import deepmerge from 'deepmerge';

const axiosMock =
  (customMock = {}) =>
  () =>
    deepmerge(
      {
        default: {
          post: vi.fn(() => Promise.resolve({ data: {} })),
          get: vi.fn(() => Promise.resolve({ data: {} })),
          delete: vi.fn(() => Promise.resolve({ data: {} })),
          put: vi.fn(() => Promise.resolve({ data: {} })),
          patch: vi.fn(() => Promise.resolve({ data: {} })),
          request: vi.fn(() => Promise.resolve({ data: {} })),
          create: vi.fn().mockReturnThis(),
          interceptors: {
            request: {
              use: vi.fn(),
              eject: vi.fn(),
            },
            response: {
              use: vi.fn(),
              eject: vi.fn(),
            },
          },
        },
      },
      customMock,
    );

export default axiosMock;
