# API Clients

API clients, ready to use in project "Out of the box".

## Interface

Each client should have default Interface for CRUD methods.
**This naming is important, because Store modules depend on this interface.**

- `getList: (params: any) => Promise<{ items: array, next: boolean }>`;
- `get: ({ itemId: string }) => Promise<{}>`;
- `add: ({ itemInstance: object }) => Promise<any>`;
- `patch: ({ id: string, changes: object }) => Promise<any>`;
- `update: ({ itemId: string, itemInstance: object }) => Promise<any>`;
- `delete: ({ id: string }) => Promise<any>`;
- `getLookup:` see `getList`.

All other methods are named depending on context.

## Users

```js
import { users } from '@webitel/ui-sdk/src/api/clients';

const {
  getList,
  get,
  add,
  patch,
  update,
  delete: _delete,
  getLookup,
  patchUserPresence,
  logoutUser,
} = users;
```

## Roles

```js
import { roles } from '@webitel/ui-sdk/src/api/clients';

const {
  getList,
  get,
  add,
  update,
  delete: _delete,
  getLookup,

  getExtendedRoles,
  getPermissionsOptions,
} = roles;
```

## Queues

```js
import { queues } from '@webitel/ui-sdk/src/api/clients';

const {
  getList,
  get,
  add,
  patch,
  update,
  delete: _delete,
  getLookup,

  getQueuesTags,
} = queues;
```

## Media

```js
import { media } from '@webitel/ui-sdk/src/api/clients';

const {
  getList,
  get,
  add,
  delete: _delete,
  getLookup,
} = media;
```

## Lists

```js
import { lists } from '@webitel/ui-sdk/src/api/clients';

const {
  getList,
  get,
  add,
  patch,
  update,
  delete: _delete,
  getLookup,
} = lists;
```

## Gateways

```js
import { gateways } from '@webitel/ui-sdk/src/api/clients';

const {
  getList,
  get,
  add,
  patch,
  update,
  delete: _delete,
  getLookup,
} = gateways;
```

## Flows
    
```js
import { flows } from '@webitel/ui-sdk/src/api/clients';

const {
  getList,
  get,
  add,
  patch,
  update,
  delete: _delete,
  getLookup,
  
  getFlowTags,
} = flows;
```

## Communications

```js
import { communications } from '@webitel/ui-sdk/src/api/clients';

const {
  getList,
  get,
  add,
  patch,
  update,
  delete: _delete,
  getLookup,
} = communications;
```

## Chat Gateways

```js
import { chatGateways } from '@webitel/ui-sdk/src/api/clients';

const {
  getList,
  get,
  add,
  patch,
  update,
  delete: _delete,
  getLookup,
} = chatGateways;
```

## Calendars

```js
import { calendars } from '@webitel/ui-sdk/src/api/clients';

const {
  getList,
  get,
  add,
  patch,
  update,
  delete: _delete,
  getLookup,

  getTimezonesLookup,
} = calendars;
```


## Buckets

```js
import { buckets } from '@webitel/ui-sdk/src/api/clients';

const {
  getList,
  get,
  add,
  update,
  delete: _delete,
  getLookup,
} = buckets;
```

## Agents

```js
import { agents } from '@webitel/ui-sdk/src/api/clients';

const {
  getList,
  get,
  add,
  patch,
  update,
  delete: _delete,
  getLookup,
  
  getAgentHistory,
  getRegularAgentsOptions,
  getAgentUsersOptions,
  getSupervisorOptions,
} = agents;
```
