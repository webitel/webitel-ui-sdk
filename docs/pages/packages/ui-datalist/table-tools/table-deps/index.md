# `@webitel/ui-sdk` Table store deps: page, headers, filters stores


## Фільтри

### Як це працює

Головне джерело данних `FiltersManager` (`filtersManager` у [Table Store](../table/index.md)):
він тримає застосовані фільтри — `Map<FilterName, IFilter>` — і вміє `addFilter`/`updateFilter`/
`deleteFilter`/`getFilter`/`hasFilter`, `toString`/`fromString` (для persistence, presets).

`filterOptions` — окрема декларація, **що взагалі можна** фільтрувати на цій сторінці:
`(FilterOption | FilterConfig)[]`, зазвичай `configs/filtersOptions.ts`. Це не стан — просто список
доступних фільтрів і, за потреби, кастомних конфігів для них.

### Режими

Те, **як користувач обирає фільтр**, має два режими:

- **Чіпси** — `TableFiltersPanelComponent` за замовчуванням: застосовані фільтри показані чіпсами,
  нові додаються кнопкою "+" (сторінка cases-crm)
- **Селекти** — той самий компонент із `static-mode`: усі фільтри з `filterOptions` одразу як поля,
  без чіпсів і без "+" (сторінка contact-groups-crm)

Колонкові фільтри (іконка в хедері) — окремий шар, незалежний від режиму панелі: вони
поєднуються з будь-яким із них або працюють без панелі взагалі. Звідси три робочі комбінації:

- **чіпси + хедери** — панель над таблицею **і** іконки фільтра в колонках (реєстр звернень у `crm`);
- **селекти + хедери** — статична панель **і** іконки в колонках (черги, їх учасники та логи у `client`);
- **тільки хедери** — панелі немає, фільтри живуть лише в іконках колонок.

Панель і колонка працюють з одним `filtersManager`, тож фільтр, застосований у хедері, одразу
видно в панелі, і навпаки. Щоб вони не розійшлися конфігами, віддавайте один і той самий запис
і в `filterOptions`, і в `header.filter` — див. останню секцію нижче.

### Підключення: панель (чіпси)

Джерело: [`cases-filters-panel.vue`](https://github.com/webitel/crm/blob/main/src/modules/cases/components/cases-filters-panel.vue).

```vue
<template>
  <table-filters-panel
    :filters-manager="filtersManager"
    :filter-options="filtersOptions"
    @filter:add="addFilter"
    @filter:update="updateFilter"
    @filter:delete="deleteFilter"
    @filter:reset-all="resetFilters"
  />
</template>

<script lang="ts" setup>
import { TableFiltersPanelComponent as TableFiltersPanel } from '@webitel/ui-datalist/filters';
import { storeToRefs } from 'pinia';

import { filtersOptions } from '../configs/filtersOptions';
import { useCasesDatalistStore } from '../stores/datalist/casesDatalistStore';

const tableStore = useCasesDatalistStore();
const { filtersManager } = storeToRefs(tableStore);
const { addFilter, updateFilter, deleteFilter } = tableStore;

const resetFilters = () => filtersManager.value.reset();
</script>
```

### Підключення: колонкові фільтри

Іконка+попап у хедері колонки малює сам `wt-table` (по `header.filter`/`header.filtered` —
[деталі у WtTable](../../../ui-sdk/components/wt-table/Readme.md#фільтри-в-колонках)); вміст
попапу — ваш `column-filter`-компонент через слот `#column-filter`.

1. Позначте, які хедери мають фільтр:

```ts
// headers.ts
export const headers: DatalistTableHeader[] = [
  {
    value: 'priority',
    field: 'priority',
    filter: FilterOption.CasePriority,
  },
];
```

2. Один невеликий wrapper на таблицю — зв'язує `ColumnFilterComponent` з вашим table store:

```vue
<!-- headers-column-filter.vue -->
<template>
  <column-filter
    :header="header"
    :form-view="formView"
    :hide="hide"
    :filters-manager="filtersManager"
    @add:filter="addFilter"
    @update:filter="updateFilter"
    @delete:filter="deleteFilter"
  />
</template>

<script setup lang="ts">
import { ColumnFilterComponent as ColumnFilter } from '@webitel/ui-datalist/filters';
import type { WtTableHeader } from '@webitel/ui-sdk/components/wt-table/types/WtTable';
import { storeToRefs } from 'pinia';

import { useCasesDatalistStore } from '../stores/datalist/casesDatalistStore';

// саме те, що віддає слот `#column-filter`, — щоб `v-bind="scope"` нижче типізувався як є
defineProps<{
  header: WtTableHeader;
  formView?: boolean;
  hide?: () => void;
}>();

const tableStore = useCasesDatalistStore();
const { filtersManager } = storeToRefs(tableStore);
const { addFilter, updateFilter, deleteFilter } = tableStore;
</script>
```

3. Підключіть wrapper до `wt-table` через слот:

```vue
<!-- the-cases.vue -->
<wt-table :headers="shownHeaders">
  <template #column-filter="scope">
    <headers-column-filter v-bind="scope" />
  </template>
</wt-table>
```

### `filterOptions` / `header.filter`: ім'я чи вже готовий конфіг

І в `filterOptions` (для панелі), і в `header.filter` (для колонки) — один і той же принцип: запис
або **просте ім'я**, або **вже готовий конфіг**.

- **Просте ім'я** (`FilterOption.CasePriority`) — підходить, коли нічого кастомізувати не треба:
  панель і `useColumnFilter` самі побудують дефолтний конфіг через `createFilterConfig({ name })`.
- **Готовий конфіг**, побудований `createFilterConfig({ name, ...customParams })`, — тільки коли
  потрібні параметри, що відрізняються від дефолту (наприклад `hideUnassigned` для `ContactGroup`).
  Використовуйте **той самий інстанс** і в `filtersOptions`, і в `header.filter` цього хедера — тоді
  іконка колонки й чіпс панелі гарантовано описують один і той же фільтр.

```ts
// configs/filtersOptions.ts
export const contactGroupFilterConfig = createFilterConfig({
  name: FilterOption.ContactGroup,
  hideUnassigned: true,
});

export const filtersOptions: FilterConfigDefinition[] = [
  contactGroupFilterConfig,
  FilterOption.ContactOwner,
];
```

```ts
// headers.ts
filter: contactGroupFilterConfig,
```

Не обгортайте фільтр у `createFilterConfig` "для однаковості", коли й так підходить дефолт — якщо
нічого не кастомізовано, просте ім'я коротше і його поведінка ідентична.
