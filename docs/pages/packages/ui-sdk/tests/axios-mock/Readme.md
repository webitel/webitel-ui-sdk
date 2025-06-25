# Axios Mock

Mocking axios requests for testing purposes.

```js
// setup file, or actual test file
import axiosMock from '@webitel/ui-sdk/src/tests/mocks/axiosMock';

// pass vitest instance
const mock = axiosMock();
vi.doMock('axios', mock);
```

Note: is you want to mock all requests, globally, do it in setup file for tests,
like `tests/config/config.js` in consumer project.

## What if you need to override some of the mocks?

Make a deep merge of your custom mock with axiosMock instance.

```js
import axiosMock from '@webitel/ui-sdk/src/tests/mocks/axiosMock';
import merge from 'deepmerge';

const mock = axiosMock({
  default: {
    request: jest.fn(),
  },
});
```

## vi.mock vs vi.doMock?

### tldr;

`.mock` is hoisted, so it won't access any other variables,
`.doMock` is not hoisted, so it will access other variables.

```js
// For instance
const mock = axiosMock();
vi.mock('axios', mock); // won't work
vi.doMock('axios', mock); // will work

// BUT
vi.mock('axios', axiosMock()); // will work
```

if you're not sure, use `doMock`

### More info

[github issue](https://github.com/vitest-dev/vitest/issues/4872)

[doMock](https://vitest.dev/api/vi.html#vi-mock) isn't hoisted,
but [mock](https://vitest.dev/api/vi.html#vi-domock) is
