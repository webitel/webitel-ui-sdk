# Axios-related assets

## generateInstance

Generates axios instance with default settings,
interceptors could be passed as a param.

```js
import generateInstance from '@webitel/ui-sdk/src/api/axios/generateInstance';

const instance = generateInstance({
  interceptors: {
    request: [...],
    response: [...],
  },
});
```
