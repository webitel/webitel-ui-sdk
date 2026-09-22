# `TableVariableColumnSelect` Module

UI для керування динамічними колонками таблиці з префіксом `variables.*`
(змінні дзвінків у History, атрибути контактів у CRM).

> [!NOTE]
> Отримання значення клітинки лишається в аплікейшені: History має
> `variables` як key→value record, Contacts — `{ data: [{ key, value }] }`.

## TLDR Usage

```vue
<template>
  <wt-table-variable-column-select
    :storage-key="`${namespace}/variable-headers`"
    :title="$t('variableColumnSelect.title')"
    @update:variable-headers="updateVariableHeaders"
  />
</template>

<script setup lang="ts">
import {
  WtTableVariableColumnSelect,
  useTableVariableHeaders,
} from '@webitel/ui-sdk/modules/TableVariableColumnSelect';

const { updateVariableHeaders } = useTableVariableHeaders({
  headers,
  updateShownHeaders,
});
</script>
```

## API

### `WtTableVariableColumnSelect`

Попап для додавання / видалення ключів колонок зі змінними.
Ключі зберігаються в `localStorage` під `storageKey`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `storageKey` | `string` | — | ключ у `localStorage` |
| `title` | `string` | — | заголовок попапа / tooltip |
| `fieldPrefix` | `string` | `VARIABLE_FIELD_PREFIX` (`'variables.'`) | префікс для `field` / `value` хедера |
| `size` | `ComponentSize` | `MD` | розмір попапа (800px) |

Емітить `update:variable-headers` при restore (на mount) і при save.
**Не** приймає headers пропом — стан LS тримає сам компонент.

### `useTableVariableHeaders({ headers, updateShownHeaders })`

Мерджить емітнуті variable-хедери в стор хедера таблиці: зберігає
видимість наявних variable-колонок, додає нові, прибирає видалені.

### `isVariableHeader(header)`

`true`, якщо `header.field` або `header.value` починається з
`VARIABLE_FIELD_PREFIX`.

### `VARIABLE_FIELD_PREFIX`

`'variables.'`

### `TableVariableHeader`

Аліас `WtTableHeader`.
