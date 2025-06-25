# `store/index.js`

Стор модуля для компонента пермішенів.

Тут трохи складно, тому що цей стор модуль вертає модуль, в якому є модулі
[таблиці](../../../store/createTableStoreModule/Readme.md) та
[карточки](../../../store/createCardStoreModule/Readme.md), а отже хоче як залежність модуль
[апі](../../../store/createApiStoreModule/Readme.md).

Тому, маємо ось таку заглибленість,
**з залежностями** `getters/PARENT_ID` **та** `modules/api`:

```js
import { createObjectPermissionsStoreModule } from '@webitel/ui-sdk/src/modules/ObjectPermissions/store/index.js';

const permissions = createObjectPermissionsStoreModule({
  modules: {
    table: {
      // note: this is a table module, child of permissions module
      getters: {
        PARENT_ID: (s, g, rootState) => rootState.directory.users.card.itemId, // required!
      },
      modules: {
        api, // required!
      },
    },
  },
});

const card = createCardStoreModule({
  // ...
  modules: {
    // ...
    permissions,
  },
});
```
