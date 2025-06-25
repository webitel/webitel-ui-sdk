# `@webitel/api-services`

## Contents:

### Generated API services. 

_Source: webitel [swagger file](https://swagger.webitel.com/)._

### API clients.

API clients – self-written api wrappers on top of gen services.

### Utils, tools and helpers, related to API communication.

## Exports:

### `@webitel/api-services/gen`

```ts
import {
    // zod, services, msw
} from '@webitel/api-services/gen';
```

### `@webitel/api-services/gen/models`

```ts
import {
    // enums, types and interfaces
} from '@webitel/api-services/gen/models';
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

## FAQ

### Q: How to generate API:

Run [this](https://github.com/webitel/webitel-ui-sdk/actions/workflows/api-services.publish.yml)
**manual** workflow.

## Related links:

* backend proto annotations [guideline](https://github.com/webitel/protos/blob/docs(proto-annotation-guidelines)/docs/proto_annotation_guidelines.md)
