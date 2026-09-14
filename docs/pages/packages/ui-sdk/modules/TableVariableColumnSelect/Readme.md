# `TableVariableColumnSelect` Module

UI for managing dynamic `variables.*` table columns (History call variables, Contacts attributes).

> [!NOTE]
> Cell value lookup stays in the app — History uses a key→value record, Contacts uses `{ data: [{ key, value }] }`.

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

Popup to add/remove variable column keys. Persists keys in `localStorage` under `storageKey`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `storageKey` | `string` | — | `localStorage` key |
| `title` | `string` | — | Popup / tooltip title |
| `fieldPrefix` | `string` | `VARIABLE_FIELD_PREFIX` (`'variables.'`) | Prefix for header `field` / `value` |
| `size` | `ComponentSize` | `SM` | Popup size |

Emits `update:variable-headers` on restore (mount) and save. Does **not** take headers as a prop — the component owns LS state.

### `useTableVariableHeaders({ headers, updateShownHeaders })`

Merges emitted variable headers into the table headers store (keeps visibility of existing variable columns, appends new ones, drops removed ones).

### `isVariableHeader(header)`

`true` when `header.field` or `header.value` starts with `VARIABLE_FIELD_PREFIX`.

### `VARIABLE_FIELD_PREFIX`

`'variables.'`

### `TableVariableHeader`

Alias of `WtTableHeader`.
