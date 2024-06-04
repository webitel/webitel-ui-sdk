# Integration between store modules

## Prerequisites

* [modules/TableStoreModule](../../../webitel-ui/modules/table-store-module/Readme.md)
* [modules/CardStoreModule](../../../webitel-ui/modules/card-store-module/Readme.md)
* [modules/Filters](../../../webitel-ui/modules/Filters/Readme.md)
* [store/APIStoreModule](../../../webitel-ui/store/api-store-module/Readme.md)

## Опис

Стор однієї сутності зазвичай складається з кількох (стор) компонентів:

1. табличка [modules/TableStoreModule](../../../webitel-ui/modules/table-store-module/Readme.md)
2. карточка [modules/CardStoreModule](../../../webitel-ui/modules/card-store-module/Readme.md)
3. фільтри [modules/Filters](../../../webitel-ui/modules/Filters/Readme.md)
4. апішки [store/APIStoreModule](../../../webitel-ui/store/api-store-module/Readme.md)

По суті, всі вони потрібні для повноцінної репрезентації сутності в інтерфейсі,
але, втім, вони достатньо різні, щоб розділити їх одне від одного на окремі модулі.

Тому, хоча модулів декілька, вони як правило грають всі разом, і складаються однією купкою.

Складаються вони за ось таким форматом, в програмі-максимум:

1. У нас є базовий стор модуль, скажімо, `contacts.store.js`.
2. Він є інстансом `BaseStoreModule.js` [дока](../../../webitel-ui/store/base-store-module/Readme.md), та включає в
   себе,
   як чайлдів, стор таблички, і стор карточки.
3. І стор таблички, і стор карточки, містять в собі стор апішок для комунікації з бекендом.
4. А стор таблички ще має, як правило, стор фільтрів.

## Наглядно

Наглядно це виглядає ось так:

// **TODO: намалювати діаграмку**

## Приклад

А ось так це робиться на прикладі:

```javascript
// contacts.store.js

import TableStoreModule from '@webitel/ui-sdk/src/modules/TableStoreModule/store/TableStoreModule.js';
import CardStoreModule from '@webitel/ui-sdk/src/modules/CardStoreModule/store/CardStoreModule.js';
import BaseStoreModule from '@webitel/ui-sdk/src/store/BaseStoreModules/BaseStoreModule.js';
import ApiStoreModule from '@webitel/ui-sdk/src/store/BaseStoreModules/ApiStoreModule.js';
import FiltersStoreModule from '@webitel/ui-sdk/src/modules/Filters/store/FiltersStoreModule.js';

const filters = new FiltersStoreModule().addFilter([{ ... }]).getModule();

const api = new ApiStoreModule()
.generateAPIActions(ContactsAPI)
.getModule();

const table = new TableStoreModule({ headers })
.setChildModules({ api, filters })
.getModule({ getters: tableGetters });

const card = new CardStoreModule()
.getModule({ state: cardState });

const contacts = new BaseStoreModule()
.setChildModules({ table, card })
.getModule();

export default contacts;
```

