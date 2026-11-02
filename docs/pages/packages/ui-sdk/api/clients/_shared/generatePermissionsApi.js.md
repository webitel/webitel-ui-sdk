# `generatePermissionsApi.js`

Скрипт викликається в середині файлу апішки.
Необхідний для [`@webitel/ui-datalist/permissions`](../../../../ui-datalist/permissions/index.md) (`createPermissionsStore` / `PermissionsTab`)

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
