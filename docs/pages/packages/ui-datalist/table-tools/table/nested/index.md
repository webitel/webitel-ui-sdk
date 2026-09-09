# Table Tools: Nested Table List

`useNestedTableList` — табличка, яка живе **в табі карточки**: бакети, навички,
хуки, ресурси черги; умови статусу; комунікації контакта.

На прикладі таба **Buckets** у карточці черги (`client`).

## Коли використовувати

| | звичайний реєстр | вкладений список |
|---|---|---|
| Де живе | окрема сторінка (`the-queues.vue`) | таб карточки (`opened-queue-buckets.vue`) |
| URL | `/contact-center/queues` | `/contact-center/queues/159/buckets` |
| Чий запис показує | всі записи | записи **одного батька** (`parentId`) |
| Store | `useTableStore()` напряму | `useNestedTableList({ useTableStore })` |

## Проблема, яку це вирішує

Store вкладеного списку — **pinia singleton**. Один store на таб, спільний для
**всіх** карточок цієї сутності, і живе він довше за будь-яку з них.

Тому таб, який брав store напряму, показував записи тієї карточки, яку відкривали
**перед** цією. А карточка нового запису взагалі не викликала `initialize` — бо
немає `id`, з яким його викликати — і показувала чужі рядки, доки її не збережуть.

> [!IMPORTANT]
> Правило: **карточка володіє своїми вкладеними списками.**
> Card store тримає реєстр списків, відкритих під ним, і чистить їх у `$reset()`
> — а `$reset()` карточка вже викликає на `onUnmounted`.

[WTEL-10350](https://webitel.atlassian.net/browse/WTEL-10350)

## Usage

Store — **той самий** `createTableStore`, як для звичайного реєстру:

```ts
// client/.../buckets/stores/datalist/queueBucketsDatalistStore.ts

import { QueueBucketsAPI } from '@webitel/api-services/api';
import { createTableStore } from '@webitel/ui-datalist';

export const useQueueBucketsDatalistStore = createTableStore(
  `${QueueBucketsNamespace}/datalist`,
  {
    apiModule: QueueBucketsAPI,
    headers,
  },
);
```

Різниця — тільки в компоненті таба:

```vue
<script lang="ts" setup>
import { useNestedTableList } from '@webitel/ui-datalist'; // [!code highlight]
import { storeToRefs } from 'pinia';

import { useQueueBucketsDatalistStore } from '../stores/datalist/queueBucketsDatalistStore';

const tableStore = useNestedTableList({ // [!code highlight]
  useTableStore: useQueueBucketsDatalistStore, // [!code highlight]
}); // [!code highlight]

const { dataList, isLoading, page, size, next, selected, shownHeaders } =
  storeToRefs(tableStore);

const { loadDataList, updatePage, updateSize, updateSort, deleteEls } =
  tableStore;
</script>
```

Повертає **той самий store**, який віддав би `useTableStore()` — з усіма типами.
Далі працюєте з ним як завжди: `storeToRefs`, екшени, `wt-table`.

> [!NOTE]
> `initialize` викликати **не потрібно**, і `parentId` з роута читати теж.
> Якщо десь у табі залишився `watch` на `route.params.id` з `initialize` — його
> час видалити, це саме те, що робить цей composable.

## Що воно робить

1. Бере card store батьківської карточки через `inject`
   (його дає [`useCardComponent`](../../../card-tools/card/composables/Readme.md#usecardcomponent-all-in-one-на-рівні-клієнта)).
2. **Реєструє** список у ньому — `cardStore.registerNestedList(tableStore)`.
3. Слідкує за `cardStore.itemId` і на кожне його значення викликає
   `initialize({ parentId: itemId })`.
4. Карточка на `$reset()` чистить список — рядки, селект, помилку, `parentId`,
   пагінацію та фільтри.

## Lifecycle

```
Відкрили карточку черги 159
  → cardStore.itemId = 159
  → таб змонтувався, зареєструвався
  → initialize({ parentId: 159 }) → loadDataList()

Відкрили карточку нової черги (/queues/new/buckets)
  → cardStore.itemId = null
  → нічого не вантажиться, список порожній

Зберегли чергу з таба (кнопка "Додати" → save карточки)
  → cardStore.itemId = 425 (з response)
  → initialize({ parentId: 425 }) → loadDataList()

Вийшли з карточки
  → onUnmounted → cardStore.$reset()
  → списки, зареєстровані під нею, очищені
  → реєстр очищений: наступна карточка чистить тільки свої
```

## API

```ts
const tableStore = useNestedTableList({
  useTableStore,
  parentId, // optional
});
```

| Параметр | Тип | Опис |
|---|---|---|
| `useTableStore` | `() => Store` | фабрика з `createTableStore` |
| `parentId` | `MaybeRefOrGetter<CardItemId>` | лише коли батько списку — **не** запис цієї карточки |

`parentId` за замовчуванням — `cardStore.itemId`. Передавайте його явно тільки
якщо список висить не на записі карточки (напр. на значенні з форми): ref або
getter, **не** рядок — інакше значення застигне на моменті `setup`.

## Правила, які тримає store

### `$reset()` чистить дані, але не налаштування

```ts
tableStore.$reset();
```

| Чистить | Не чистить |
|---|---|
| `dataList`, `selected`, `error`, `isLoading` | `headers` — це вибір колонок користувача |
| `parentId` | `isStoreSetUp` — persistence відновлюється раз на життя апки |
| пагінацію (`page`, `size`, `next`) | |
| фільтри (`filtersManager.reset()`) | |

Викликати вручну не треба — це робить card store.

### Вкладений список без батька не вантажиться

```ts
// parentId немає: карточку закрили, або запис ще не збережений
tableStore.loadDataList(); // no-op
```

`parentId` живе **всередині** store, і виставити його може тільки `initialize`.
Тому будь-яке завантаження без батька пішло б за `parentId` **попередньої**
карточки: і ручний `loadDataList` (кнопка "Оновити"), і ті, що store робить сам —
`watch` на пагінацію, фільтри, сортування, видимі колонки.

> [!NOTE]
> Ознака "цей store — вкладений" (`isNested`) вмикається при першому
> `initialize({ parentId })` і `$reset()` її не гасить. Інакше очищений store не
> відрізнявся б від реєстрового, який батька не має **ніколи** — і правило б'є
> тільки по вкладених.

## Gotchas

**Карточка мусить бути на `useCardComponent`.** Він дає card store через
`provide`. Без нього `inject` віддасть `null`: список працюватиме, але власника,
який його почистить, не буде — тоді `parentId` передавайте самі.

**Дереєстрації немає, і це навмисно.** Таб розмонтовується на кожному переході
між табами, а карточка чистить списки вже після цього — тому запис у реєстрі
живе стільки, скільки карточка. Один і той самий store реєструється один раз
(`Set`), скільки б разів таб не змонтувався.

**Вкладений список ≠ вкладена карточка.** Список — це табличка в табі
(`useNestedTableList`). Карточка — popup або child-route одного запису
(`useNestedCardComponent`, [Nested Card Usage](../../../card-tools/card/usage/nested/Readme.md)).
У таба черги є і те, і те: список бакетів і popup одного бакета.
