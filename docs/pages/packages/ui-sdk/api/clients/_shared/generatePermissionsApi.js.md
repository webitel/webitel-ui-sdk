# `generatePermissionsApi.js`

Скрипт викликається в середині файлу апішки.
Необхідний для [`modules/ObjectPermissions`](../../../modules/ObjectPermissions/index.md)

## Отримує

- `baseUrl` - базовий URL апішки по певній сутності

## Повертає

```js
return {
  getPermissionsList,
  patchPermissions,
};
```

## Використання

```js
// users.js

import { generatePermissionsApi } from '@webitel/ui-sdk/src/api/clients/_shared/generatePermissionsApi.js';

const baseUrl = 'users';

// ...

return {
  // ...
  ...generatePermissionsApi(baseUrl),
};
```
