# `@webitel/ui-datalist` Table Store


Об'єднаний **all-in-one** стор для таблички. 

В середині створює і використовує окремі стори:
* [filters]()
* [pagination]()
* [headers]() 
(shown headers, sort, fields)

  Для того, щоб заховати всі складнощі підключення і нюанси, а на рівні клієнта (цього модуля) все було максимально простим і лаконічним: 
**Підключили в компонент, і погнали.**

## TLDR; Usage

Source code link: [cases.ts](https://github.com/webitel/crm/blob/6be5860808ac2574175b0dcb0ca459ec65d17287/src/modules/cases/stores/cases.ts)

### Створити

```ts
// crm/.../stores/cases.ts

import { createTableStore } from '@webitel/ui-datalist'; // [!code highlight]

// other imports: { CasesAPI, CasesNamespace, headers }

export const useCasesStore = createTableStore(CasesNamespace, { // [!code highlight]
    apiModule: CasesAPI, // [!code highlight]
    headers, // [!code highlight]
});
```

### Використати

Source code link: [the-cases.vue](https://github.com/webitel/crm/blob/6be5860808ac2574175b0dcb0ca459ec65d17287/src/modules/cases/components/the-cases.vue)

```vue
// crm/.../components/the-cases.vue

<template />

<script setup>
  // ...
  import { useCasesStore } from '../stores/cases'; // [!code highlight]

  // ...
  const tableStore = useCasesStore(); // [!code highlight]

  const {
    dataList,
    selected,
    error,
    isLoading,
    page,
    size,
    next,
    headers,
    shownHeaders,
    filtersManager,
  } = storeToRefs(tableStore); // [!code highlight]

  const {
    initialize,
    loadDataList,
    updateSelected,
    updatePage,
    updateSize,
    updateSort,
    deleteEls,
    updateShownHeaders,
  } = tableStore; // [!code highlight]
</script>
```

## Features and configuration params

### Config: `isAppendDataList`

Табличка працюватиме в режимі **довантаження** даних до `dataList`.

aka features:

* infinite scroll
* "load more"

### Config: `storeType`

Pinia/Composable.

* Для "типових" сторінок-табличок використовуємо `pinia` (за замовчуванням).

* Для простішого (попапи, скажімо) - краще `composable`.

See [Store Types](../../shared/store-types/index.md).

### Config: `disablePersistence`

Повністю вимкнути [PersistenceStorage](../../shared/persist/index.md) для цього стора.
для стора **і його чайлдів**.

[link](https://github.com/webitel/webitel-ui-sdk/blob/5cdb7a45b12988f441c8a7fc655314877b60a3e1/packages/ui-datalist/src/modules/table/createTableStore.store.ts#L23)

#### А якщо знадобиться вибіркове вимкнення?

Треба буде розширити цей параметр, щоб він міг приймати не тільки `boolean`, а й `{ ${store}: boolean }`.

Або взагалі конфігурувати для окремих філдів.

## Design Considerations

### Як `watch`'ити зміни фільтрів?

Наразі [максимально примітивно](https://github.com/webitel/webitel-ui-sdk/blob/5cdb7a45b12988f441c8a7fc655314877b60a3e1/packages/ui-datalist/src/modules/table/createTableStore.store.ts#L185-L195),
згідно KISS: використовуючи Vue `watch`.

На щастя, `pinia` вміє працювати з `watch`'ами, на відміну від `vuex`. Що дуже
спрощує цю задачу.

