# Filters module

Відомі як "нові фільтри".

## UPDATES

Недавно було додано:

- `components/filter-select.vue`
- `components/filter-datetime.vue`
- `store/actionsRESET_FILTERS`
- Автовстановлення `defaultValue` фільтрів від `value`
- на кожен фільтр додався геттер у сторі з його велью

Всі ці зміни я не описую детально наразі, тому що дуже скоро має бути переробка фільтрів
під новий юі і логіку, а отже, дуже ймовірно, що щось тут та й зміниться.

## Prerequisites

[Table Store Module](../../store/createTableStoreModule/Readme.md)

## Історіографія питання

### Для чого потрібні фільтри, і які до них вимоги?

Фільтри потрібні, вочевидь, щоб фільтувати масиви даних. Чому масиви? - Тому що коли ми
дивимось на один ітем, в його карточці - він вже відфільтрований. У нашому випадку,
ми хочемо фільтрувати табличне представлення даних, відправляючи запити на сервер з урахуванням
вибраної користувачем фільтрації (або фільтрації за замовчуванням!).

**Отже, які ж вимоги?**

- **Значення фільтрів повинні зберігатися у роуті**, щоб можна було відновити стан фільтрації після
  оновлення сторінки.

- **Фільтри мають бути реюзабельними**, щоб не писати їх кожен раз заново. Втім, це складна задача,
  адже включає в себе реюзабельність як компонентів, так і роботи з роутером, так і агрегацію та трансформування
  цих даних для відправки на сервер.

### Як працювали попередні фільтри?

[Детально, QueryFilters](<../query-filters/Readme.md>)

## Як працюють нові фільтри?

Отже, через це постала потреба в нових фільтрах.

В нових фільтрах було перевернуто "головою до верху" підхід до керування логікою: тепер вона міститься
у сторі, і стор є основним джерелом як істини, так і керування всією логікою фільтрації.

Крім того, тепер кожен параметр запиту є фільтром: зокрема, пейджа та сайз.

## Обʼєкт FilterSchema

Це клас, який описує схему фільтра. Він містить в собі:

- `name` фільтра
- `value` фільтра
- `getters`/`setters`/`restores`
- додаткові необхідні параметри, такі як, наприклад, `localStorageKey`.

### Getters/Setters/Restores

Це методи, які відповідають за віддачу значення фільтра, його встановлення, та відновлення.

Які бувають:

#### Getters

- `value` - повертає значення фільтра з обʼєкта схеми даних
- `query` - повертає значення фільтра з роута
- `localStorage` - повертає значення фільтра з localStorage

#### Setters

Аналогічно до [геттерів](#getters), але для встановлення значення.

#### Restores

Аналогічно до [геттерів](#getters), але за виключенням `value` (бо якщо вже є велью, то навіщо
його відновлювати?) але для відновлення значення.

Restores використовуються для відновлення значень фільтрів. Наприклад, після перезавантаження сторінки.

#### Custom getters/setters/restores

Інколи з якихось причин нам не підходить існуюча логіка геттерів/сеттерів/ресторів, тоді замість масиву
геттерів/сеттерів/ресторів ми можемо передати свої фукції, які виконуватимуть цю роботу.

Як їх реалізувати? ~~Дивіться у сорс код~~ зверніться до мене, бо там складно + кринжа.

## Enums

`enums/FiltersEvent.enum.js`.

Наразі має тільки:

- `RESTORED`
- `FILTER_SET`
- `RESET`

## Store

Стор відповідає за:

- Зберігання [обʼєктів фільтрів](#обʼєкт-filterschema) (у `state`).
- Інтерфейси доступу до фільтрів (геттери/сеттери/рестори).
- (ан)сабскрайб на зміни фільтрів.

Використовувати слід за інтерфейсом:

- Взяти значення одного фільтра по нейму:

`GET_FILTER: (filterName: string) => filterValue: any`

- Взяти значення всіх фільтрів (зверніть увагу, треба викликати, як функцію):

`GET_FILTERS: () => filters: { [filterName: string]: any }`

- Встановити значення фільтра:

`SET_FILTER: ({ name: string, value: any, silent: bool }) => void`

Залежно від параметра `silent`, (не) емітиться подія `FILTER_SET`.

- Підписка на події у фільтрах (можна підписатися на все через `'*'`):

`SUBSCRIBE: ({ event: FiltersEvent | '*', callback: fn: (payload) =>  => Promise | void })) => void`

- Відписка від **ВСІХ** подій у фільтрах:

`FLUSH_SUBSCRIBERS: () => void`

### Як додати фільтр у state?

Перед тим як викликати `.getModule()` стор модуля, необхідно викликати `.addFilter()`,
передавши в нього масив обʼєктів схем фільтрів, з яких будуть вже в середині модуля
створені інстанси класу [`FilterSchema`](#обʼєкт-filterschema).

```javascript
const module = new FiltersStoreModule()
  .addFilter([{ name: '...' }])
  .getModule();
```

## Composables

Тут є `composables/useTableFilters.js`, який відповідає за інтеграцію з компонентом.

### Отримує:

- `namespace` - неймспейс **таблички** (!), які він має використовувати.

### Вертає:

#### Properties

- `namespace` - неймспейс фільтрів

#### Methods

- `restoreFilters` - відновити фільтри
- `subscribe` - підписатися на події
- `flushSubscribers` - відписатися від усіх подій (**обовʼязково викликаєм на `onUnmounted`**)

## Components

"З коробки" є компоненти:

- `components/filter-pagination.vue`
- `components/filter-search.vue`
- `components/filter-table-fields.vue`

Всі компоненти отримують `namespace` фільтрів як `props`, і самі взаємодіють зі стор модулем.

### `filter-pagination.vue`

Компонент для фільтрації пагінації: `page` + `size`.

#### Props:

| Name        | Type   | Default | Required | Description               |
| ----------- | ------ | ------- | -------- | ------------------------- |
| `namespace` | String | -       | +        | Неймспейс фільтрів        |
| `isNext`    | Bool   | `false` |          | Відобраення кнопки "Next" |

### `filter-search.vue`

Компонент для фільтрації пошуку. Підтримує `multisearch`.

#### Props:

| Name             | Type   | Default | Required | Description                                                                                            |
| ---------------- | ------ | ------- | -------- | ------------------------------------------------------------------------------------------------------ |
| `namespace`      | String | -       | +        | Неймспейс фільтрів                                                                                     |
| `multisearch`    | Bool   | `false` |          | Включити мультипошук з вибором поля, по якому ми шукаємо                                               |
| `name`           | String | `'q'`   |          | Імʼя поля, по якому ми шукаємо                                                                         |
| `searchModeOpts` | Array  | `[]`    |          | Масив обʼєктів `{ value: string, label?: string, hint?: string, v?: object }` для вибору режиму пошуку |

### `filter-table-fields.vue`

Компонент для вибору колонок таблиці до відображення.

#### Props:

| Name            | Type   | Default | Required | Description                                          |
| --------------- | ------ | ------- | -------- | ---------------------------------------------------- |
| `namespace`     | String | -       | +        | Неймспейс фільтрів                                   |
| `headers`       | Array  | -       | +        | Хедери таблички                                      |
| `staticHeaders` | Array  | `[]`    |          | Масив `value` хедерів, обовʼязкових для відображення |

#### Events:

Підписуватись на події **не обовʼязково**, бо хедери самостійно апдейтяться через зміну фільтра `fields`.

НЕМАЄ ПОТРЕБИ ВИКОНУВАТИ АПДЕЙТ ХЕДЕРІВ `@change`.

| Name     | Payload | Description            |
| -------- | ------- | ---------------------- |
| `change` | Array   | новий `headers` обʼєкт |

## Наглядно

**TODO**

Якщо по тексту вам не дуже зроз і ви потребуєте діаграмки - пінганіть мене будь ласка.

## Приклад використання

### Стор фільтрів

```javascript
// filters.store.js

import FiltersStoreModule from '@webitel/ui-sdk/src/modules/Filters/store/FiltersStoreModule.js';

const module = new FiltersStoreModule()
  .addFilter([
    { name: 'page', value: 1, defaultValue: 1 },
    { name: 'size', value: 10, defaultValue: 10 },
    { name: 'search' },
    { name: 'sort' },
    {
      name: 'fields',
      getters: ['value', 'query', 'localStorage'],
      setters: ['value', 'query', 'localStorage'],
      restores: ['query', 'localStorage'],
    },
  ])
  .getModule();
```

### Стор таблички

```javascript
// table.store.js

import { createTableStoreModule } from '@webitel/ui-sdk/store';
import filters from './filters.store.js';

const module = new createTableStoreModule({
  modules: { filters },
});
```

### Компонент

```vue
<!--   the-table.vue -->

<template>
  <filter-search
    :namespace="filtersNamespace"
    name="q"
  />
</template>

<script setup>
import { useTableFilters } from '@webitel/ui-sdk/src/modules/Filters/composables/useTableFilters.js';
import { useTableStore } from '@webitel/ui-sdk/store';
import FilterSearch from '@webitel/ui-sdk/src/modules/Filters/components/filter-search.vue';

const namespace = 'docs';

const {
  namespace: tableNamespace,
  // ...
  onFilterEvent,
} = useTableStore(namespace);

const {
  namespace: filtersNamespace,

  subscribe,
  flushSubscribers,
  restoreFilters,
} = useTableFilters(tableNamespace);

subscribe({
  event: '*',
  callback: onFilterEvent,
});

restoreFilters();

onUnmounted(() => {
  flushSubscribers();
});
</script>
```
