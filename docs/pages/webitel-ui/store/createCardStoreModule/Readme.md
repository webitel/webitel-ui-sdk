# `createCardStoreModule`

Модуль, який використовується для створення карточки сутності.
Зазвичай, йде в парі з `createTableStoreModule` [дока](../createTableStoreModule/Readme.md),
i `createApiStoreModule` [дока](../createApiStoreModule/Readme.md).

## State

### `itemId`

Ідентифікатор сутності, з якою ми працюємо.

### `itemInstance`

Обʼєкт сутності, з яким ми працюємо.

## Actions

### `SET_PARENT_ITEM_ID`

Параметр: `id`

### `SET_ITEM_ID`

Параметр: `id`

### `LOAD_ITEM`

### `ADD_ITEM`

### `UPDATE_ITEM`

### `SET_ITEM_PROPERTY`

Параметр `{ path, value }`, де `path` - шлях до property, `value` - нове значення.

### `RESET_ITEM_STATE`

### `DELETE_ITEM`

## Mutations

Відповідно до необхідних екшенів.

## `useCardStore` composable

### Params

* `namespace`: неймспейс сутності, **без `/card`(!)**

### Returns

Станом на зараз:

```javascript
{
  namespace: cardNamespace,
    id,
    itemInstance,

    loadItem,
    addItem,
    updateItem,
    setId,
    resetState,
    setItemProp,
    deleteItem,
}
```

## Як користуватись

В деталях, дивіться `createApiStoreModule` [дока](../createApiStoreModule/Readme.md),
i [доку](../../../docs/how-to/Integration%20between%20store%20modules/Readme.md) про інтеграцію стор модулів.

### Store

```javascript
// storeModule.js

import { createCardStoreModule, createApiStoreModule } from '@webitel/ui-sdk/store';

// import, setup api module

const cardModule = createCardStoreModule({
  modules: {
    api: apiModule,
  },
});

const entityModule = createApiStoreModule({
  modules: {
    card: cardModule,
  },
});

export default entityModule;
```

### Component

```javascript
// component.vue, <script setup>

import { useCardStore } from '@webitel/ui-sdk/store';

const namespace = 'smth';

// взяли то шо надо, і використали
const { ... } = useCardStore(namespace);
```
