# Integration between store modules

## Prerequisites

- [Store Introduction](../../../ui-sdk/store/_Introduction/Readme.md)
- [createTableStoreModule](../../../ui-sdk/store/createTableStoreModule/Readme.md)
- [createCardStoreModule](../../../ui-sdk/store/createCardStoreModule/Readme.md)
- [createApiStoreModule](../../../ui-sdk/store/createApiStoreModule/Readme.md)
- [modules/Filters](../../../ui-sdk/modules/Filters/Readme.md)

## Опис

Стор однієї сутності зазвичай складається з кількох (стор) компонентів:

1. табличка [createTableStoreModule](../../../ui-sdk/store/createTableStoreModule/Readme.md)
2. карточка [createCardStoreModule](../../../ui-sdk/store/createCardStoreModule/Readme.md)
3. фільтри [modules/Filters](../../../ui-sdk/modules/Filters/Readme.md)
4. апішки [createApiStoreModule](../../../ui-sdk/store/createApiStoreModule/Readme.md)

По суті, всі вони потрібні для повноцінної репрезентації сутності в інтерфейсі,
але, втім, вони достатньо різні, щоб розділити їх одне від одного на окремі модулі.

Тому, хоча модулів декілька, вони як правило грають всі разом, і складаються однією купкою.

Складаються вони за ось таким форматом, в програмі-максимум:

1. У нас є базовий стор модуль, скажімо, `contacts.store.js`.
2. Він є інстансом `BaseStoreModule` [дока](../../../ui-sdk/store/createBaseStoreModule/Readme.md), та включає в
   себе,
   як чайлдів, стор таблички, і стор карточки.
3. І стор таблички, і стор карточки, містять в собі стор апішок для комунікації з бекендом.
4. А стор таблички ще має, як правило, стор фільтрів.

## Наглядно

Наглядно це виглядає ось так:

![воть](./assets/schema.png)

## Приклад

А ось так це робиться на прикладі:

```javascript
// contacts.store.js

import {
   createTableStoreModule,
   createCardStoreModule,
   createApiStoreModule,
   createBaseStoreModule
} from '@webitel/ui-sdk/store';
import FiltersStoreModule from '@webitel/ui-sdk/src/modules/Filters/store/FiltersStoreModule.js';

const filters = new FiltersStoreModule().addFilter([{ ... }]).getModule();

const api = createApiStoreModule({
   state: { api: { getList, get, ... } },
});

const table = createTableStoreModule({
   state: {
      headers,
   },
   getters: tableGetters,
   modules: {
      api,
      filters,
   },
});

const card = createCardStoreModule({
   state: cardState,
});

const contacts = createBaseStoreModule({
   modules: {
      table,
      card,
   },
});

export default contacts;
```
