# Context Mock

Mocking store context for testing purposes.

```js
// setup file, or actual test file
import contextMock from '@webitel/ui-sdk/src/tests/mocks/contextMock';

// pass vitest instance
const context = contextMock(vi);

/*
    context is an object with the following structure:
    {
      state: {},
      getters: {},
      actions: {},
      mutations: {},
      dispatch: vi.fn(),
      commit: vi.fn(),
    }
 */
```
