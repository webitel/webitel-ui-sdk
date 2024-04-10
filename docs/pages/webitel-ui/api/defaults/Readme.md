# Defaults

Some default API asset generators.

## getDefaultGetListResponse

Generate default `getList` response.

```js
import { getDefaultGetListResponse } from '@webitel/ui-sdk/src/api/defaults';

const response = getDefaultGetListResponse(); // { items: [], next: false }
```

## getDefaultGetParams

Generate default `get` params.

```js
import { getDefaultGetParams } from '@webitel/ui-sdk/src/api/defaults';

const params = getDefaultGetParams(); // { page = 1, size = 10 }
```

## getDefaultInstance

Generate default axios instance with interceptors.

```js
import { getDefaultInstance } from '@webitel/ui-sdk/src/api/defaults';

const instance = getDefaultInstance();
```

## getDefaultOpenAPIConfig

Generate default OpenAPI config for webitel-sdk api methods.

```js
import { getDefaultOpenAPIConfig } from '@webitel/ui-sdk/src/api/defaults';

const config = getDefaultOpenAPIConfig();
```
