# `@webitel/api-services`

## Full build steps

1. `npm run gen:api` - generate API services (both passes, then prune + dedupe)
2. `npm version patch` - bump version
3. `npm run build:types` - build types
4. `npm run format:all` - format code
5. `npm run publish-lib` - publish library

## Contents

### Generated API services. 

_Source: webitel [swagger file](https://swagger.webitel.com/)._

### API clients.

API clients – self-written api wrappers on top of gen services.

### Utils, tools and helpers, related to API communication.

## Exports:

### `@webitel/api-services/gen`

Generated **types only**, in camelCase: models, enums and their zod schemas.
This is the shape apps share with each other.

```ts
import {
    // enums, types and interfaces, zod schemas of the models
} from '@webitel/api-services/gen';
```

### `@webitel/api-services/gen/models`

Same set, addressed directly.

```ts
import {
    // enums, types and interfaces
} from '@webitel/api-services/gen/models';
```

### `@webitel/api-services/gen-wire`

Generated **services** and the zod schemas of requests/responses, with field
names exactly as swagger declares them (`uploaded_at.from`, `via.id`). This is
the only generated client; api clients call it.

```ts
import {
    getSources, // api service
    CreateSourceBody, // zod
    ListSourcesQueryParams, // zod
} from '@webitel/api-services/gen-wire';
```

### `@webitel/api-services/gen-wire/models`

```ts
import type {
    // wire-shaped params/body/response types
} from '@webitel/api-services/gen-wire/models';
```

### `@webitel/api-services/gen/utils`

```ts
import {
    // get list of top-level field keys. useful to sanitize fieldsToSend
    getShallowFieldsToSendFromZodSchema,
    // DONT USE. same, but for nested fields
    getFieldsToSendFromZodSchema,
    // pass zod schema, pass empty object, get object with default values
    getDefaultsFromZodSchema,
} from '@webitel/api-services/gen/utils';
```

### `@webitel/api-services/api`

See ["contents" section](#api-clients).

```ts
import { ContactsAPI } from '@webitel/api-services/api';
```

### `@webitel/api-services/api/transformers`

API transformers, used to transform data before sending it to the server or after receiving it from the server.

```ts
import { applyTransform } from '@webitel/api-services/api';
```

### `@webitel/api-services/api/defaults`

API defaults: default axios instance, default getList response, etc

```ts
import { getDefaultInstance } from '@webitel/api-services/api/defaults';
```

### `@webitel/api-services/api/axios`

Axios instance helpers, and the default instance used by generated services.

```ts
import {
    generateInstance,
    setDefaultAxiosInstance,
    getDefaultAxiosInstance,
} from '@webitel/api-services/api/axios';
```

## Usage

### Two generation passes

One spec is generated twice: the camelCase pass into `src/gen` (types only) and
the wire pass into `src/gen-wire` (services + zod). See the
[docs page](https://webitel.github.io/webitel-ui-sdk/pages/packages/api-services/usage/wire-vs-camel/)
for why, and for the `sanitizeToWire` + `camelToSnake` ordering rule that api
clients follow.

> msw/faker mocks are no longer generated.

### Custom axios instance

Generated services accept an axios instance, and fall back to a default one
(`getDefaultInstance()`, created lazily on first request) when none is passed.
No build-time alias is needed on the consumer side.

Per call site:

```ts
import { getAgentService } from '@webitel/api-services/gen-wire';

getAgentService(myInstance).searchAgent(params);
```

App-wide — call it once at bootstrap, before the first request:

```ts
// main.ts
import { setDefaultAxiosInstance } from '@webitel/api-services/api/axios';

import { instance } from './app/api/instance';

setDefaultAxiosInstance(instance);
```

This is what to use for app-specific interceptors, headers, `baseURL`, etc.
Building such an instance is easiest on top of the package helpers:

```ts
import { generateInstance } from '@webitel/api-services/api/axios';
import { getDefaultInstance } from '@webitel/api-services/api/defaults';
```


## FAQ

### Q: How to generate API?

A: Run [this](https://github.com/webitel/webitel-ui-sdk/actions/workflows/api-services.publish.yml)
**manual** workflow.

### Q: generating source?
A: `https://raw.githubusercontent.com/webitel/protos/main/swagger/api.json`

### Q: Versioning?
A: Automated version patching on each action run.
minor/major version bump is manual, if needed.

## Related links:

* backend proto annotations [guideline](https://github.com/webitel/protos/blob/docs(proto-annotation-guidelines)/docs/proto_annotation_guidelines.md)
