# Interceptors

Here go axios interceptors.

## Request

### updateToken

Setup access token from localStorage to axios instance header before each request.

```js
import updateTokenInterceptor from '@webitel/ui-sdk/src/api/interceptors/request/updateToken.interceptor';

const instance = generateInstance({
  interceptors: {
    request: [updateTokenInterceptor],
  },
});
```

## Response

### handleUnauthorized

Removes access token from localStorage at 401 error.

```js
import handleUnauthorizedInterceptor from '@webitel/ui-sdk/src/api/interceptors/response/handleUnauthorized.interceptor';

const instance = generateInstance({
  interceptors: {
    response: [handleUnauthorizedInterceptor],
  },
});
```
