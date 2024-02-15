/*
Why .doMock() and not .mock()?

https://github.com/vitest-dev/vitest/issues/4872

doMock isn't hoisted, but mock is
https://vitest.dev/api/vi.html#vi-mock
https://vitest.dev/api/vi.html#vi-domock
 */

const axiosMock = (vi) => vi.doMock('axios', () => {
  return {
    default: {
      post: vi.fn(() => Promise.resolve({ data: {}})),
      get: vi.fn(() => Promise.resolve({ data: {}})),
      delete: vi.fn(() => Promise.resolve({ data: {}})),
      put: vi.fn(() => Promise.resolve({ data: {}})),
      patch: vi.fn(() => Promise.resolve({ data: {}})),
      request: vi.fn(() => Promise.resolve({ data: {}})),
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

export default axiosMock;
