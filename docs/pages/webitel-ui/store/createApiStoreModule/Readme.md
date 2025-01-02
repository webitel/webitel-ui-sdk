# `createApiStoreModule`

Метод для створення стора для апі, який вже має в собі методи для роботи з апі. Зазвичай працює у звʼязці з
`card` i `tableStoreModule`.

## State

### `api`

**БЕЗ ЦЬОГО НЕ РОБИТИМЕ!**

При створенні модуля обовʼязково треба передати обʼєкт з методами для роботи з апі. Докладніше в цій доці:
[api/clients#interface](../../api/clients/Readme.md#interface).

## Actions

### `GET_LIST`

Приймає параметром `{ context, params }`, де `context` - контекст стора, який викликає цю апішку, `params` - параметри
для запиту.

### `GET_ITEM`

Приймає параметром `{ context, params }`, де `context` - контекст стора, який викликає цю апішку, `params` - параметри
для запиту.

### `POST_ITEM`

Приймає параметром `{ context }`, де `context` - контекст стора, який викликає цю апішку.

### `PATCH_ITEM`

Приймає параметром `{ context, id, changes }`, де `context` - контекст стора, який викликає цю апішку. `id` -
ідентифікатор запису, `changes` - зміни.

### `UPD_ITEM`

Приймає параметром `{ context }`, де `context` - контекст стора, який викликає цю апішку.

### `DELETE_ITEM`

Приймає параметром `{ context, id }`, де `context` - контекст стора, який викликає цю апішку. `id` - ідентифікатор
запису.

## Чому ми передаємо контекст і як воно роздупляється?

Так історично склалося, що, зазвичай, стейт доволі однаковий: у ньому є `itemId`, `itemInstance`, і всякі такі штуки,
необхідні
для створення, або апдейту запису. Відповідно, ми передаємо повний контекст того стора на апі, щоб у самому, скажімо,
методі `update` у файлику апішки витягти з параметрів `{ itemInstance, itemId }`.

Не гарно? - Згоден. Так склалось історично 🙂

## Використання

Зазвичай апі стор модуль використовується як чайлд іншого модуля зі своїм контекстом, який його викликає.

```js
import { createApiStoreModule, createBaseStoreModule } from '@webitel/ui-sdk/store';
import smthApi from '../api/smth'; // { getList, get, ... }

const actions = {
  GET_LIST_OF_SMTH: (context) => context.dispatch('api/GET_LIST', { context, params: { smth: 'smth' } }),
};

const apiModule = createApiStoreModule({
  state: {
    // без цього не робитиме!
    api: smthApi,
  },
});

const baseModule = createBaseStoreModule({
  actions,
  modules: {
    api: apiModule,
  },
});

export default baseModule;
```

