# `@webitel/ui-sdk` Table store deps: page, headers, filters stores


## Фільтри

### Як це працює

Все крутиться навколо одного `FiltersManager` (`filtersManager` у [Table Store](../table/index.md)):
він тримає застосовані фільтри — `Map<FilterName, IFilter>` — і вміє `addFilter`/`updateFilter`/
`deleteFilter`/`getFilter`/`hasFilter`, `toString`/`fromString` (для persistence, presets).

`filterOptions` — окрема декларація, **що взагалі можна** фільтрувати на цій сторінці:
`(FilterOption | FilterConfig)[]`, зазвичай `configs/filtersOptions.ts`. Це не стан — просто список
доступних фільтрів і, за потреби, кастомних конфігів для них.

До того самого `filtersManager` можна підключити **дві поверхні**, і вони автоматично лишаються
синхронізованими (бо це один спільний стан):

- **Панель із чіпсами** (`TableFiltersPanelComponent`) — окремий UI-блок над/біля таблиці.
- **Колонкові фільтри** (`ColumnFilterComponent`, іконка в хедері `wt-table`) — [WTEL-7727](https://webitel.atlassian.net/browse/WTEL-7727).

Можна використовувати щось одне або обидва разом (типовий кейс: панель + колонкові фільтри на тій
самій таблиці — застосував фільтр з колонки, з'явився чіпс у панелі, і навпаки).

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

Панель тільки емітить (`add`/`update`/`delete`) — сама `filtersManager` не мутує. `addFilter` /
`updateFilter` / `deleteFilter`, які ви бачите вище, — це вже методи вашого table store
(`createTableStore`), не `filtersManager` напряму.

#### Два режими панелі: select (за замовчуванням) і `static-mode`

- **За замовчуванням (select, "старий" спосіб)** — застосовані фільтри показані чіпсами, і є кнопка
  "+" (`dynamic-filter-add-action`), яка відкриває попап з **селектом**: спершу обираєш **яким
  фільтром** з `filterOptions` хочеш скористатись (`wt-single-select` за `option-value="name"`), і
  тільки тоді з'являється інпут значення для нього. Один фільтр за раз.
- **`static-mode`** — усі фільтри з `filterOptions` рендеряться одразу як поля (`static-filter-field`
  на кожен), без кнопки "+" і без select — нема чого обирати, все вже на екрані, просто заповнюєш
  потрібне. Джерело: [`add-contacts-in-group-filters-panel.vue`](https://github.com/webitel/crm/blob/main/src/modules/configuration/modules/lookups/modules/contact-groups/modules/add-contacts-in-group/components/add-contacts-in-group-filters-panel.vue).

  ```vue
  <table-filters-panel
    :filters-manager="filtersManager"
    :filter-options="filtersOptions"
    static-mode
    @filter:add="addFilter"
    @filter:update="updateFilter"
    @filter:delete="deleteFilter"
    @filter:reset-all="resetFilters"
  />
  ```

Колонкові фільтри (нижче) — ще один, третій варіант тієї самої форми (`column-mode`): без select
(ім'я вже визначене тим, на яку іконку колонки клікнули) і без лейбла.

### Підключення: колонкові фільтри

Іконка+попап у хедері колонки малює сам `wt-table` (по `header.filter`/`header.filtered` —
[деталі в доці WtTable](../../../ui-sdk/components/wt-table/Readme.md#фільтри-в-колонках)); вміст
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
import type { DatalistTableHeader } from '@webitel/ui-datalist';
import { ColumnFilterComponent as ColumnFilter } from '@webitel/ui-datalist/filters';
import { storeToRefs } from 'pinia';

import { useCasesDatalistStore } from '../stores/datalist/casesDatalistStore';

defineProps<{
  header: DatalistTableHeader;
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

Бейдж на іконці (`header.filtered`) рахує сам table store з `filtersManager` — нічого рахувати чи
прокидати додатково не треба.

`filter-options`/`filterable-extension-fields` на `<column-filter>` потрібні, тільки якщо у вас є
хедери з простим іменем (без готового конфіга), яке треба зматчити з налаштованим інстансом із
посторінкового `filterOptions` (див. нижче). Якщо кожен хедер — або без кастому, або вже готовий
конфіг, обидва пропси можна не передавати.

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
  contactGroupFilterConfig, // кастом — панель бачить той самий інстанс
  FilterOption.ContactOwner, // без кастому — просте ім'я
];
```

```ts
// headers.ts
filter: contactGroupFilterConfig, // той самий інстанс, не новий createFilterConfig(...)
```

Не обгортайте фільтр у `createFilterConfig` "для однаковості", коли й так підходить дефолт — якщо
нічого не кастомізовано, просте ім'я коротше і його поведінка ідентична.
