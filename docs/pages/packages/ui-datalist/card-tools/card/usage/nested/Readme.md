# Card Tools: Nested Card Usage

На прикладі вкладеної карточки **Status Condition** у CRM — popup всередині карточки Status.

## Коли використовувати

**Звичайна карточка** — окрема сторінка, один `route.params.id`:

```
/statuses/62
```

**Вкладена карточка** — popup або child-route всередині батьківської карточки:

```
/statuses/62/status-conditions/127
/statuses/62/status-conditions/new
```

Для вкладених карточок використовуй `useNestedCardComponent` замість `useCardComponent`.

## Route params — хто є хто

Приклад URL:

```
/statuses/62/status-conditions/127
```

| Параметр | Значення | Звідки |
|---|---|---|
| `parentId` | `62` | `route.params.id` — ID **батьківського** запису (Status) |
| `itemId` | `127` | store — ID **вкладеного** запису (Status Condition) |
| `routeParamName` | `'statusConditionId'` | **ім'я ключа** в `route.params`, не сам ID |
| `routeId` | `'127'` або `'new'` | `route.params[routeParamName]` — значення з URL |

> [!IMPORTANT]
> `routeParamName` — це **назва параметра роутера**, а не числовий ID.
> Якщо `routeParamName !== 'id'` — composable вважає карточку вкладеною.

## Router

[`crm/../router/index.ts`](https://github.com/webitel/crm/blob/master/src/modules/configuration/modules/lookups/router/index.ts)

```ts
{
  path: 'statuses/:id',                    // parentId = route.params.id
  component: OpenedStatus,
  children: [
    {
      path: 'status-conditions/:statusConditionId?',  // [!code highlight]
      name: 'status-conditions',
      component: OpenedStatusConditions,
    },
  ],
},
```

## Creating a store

Store для вкладеної карточки — **той самий** `createCardStore`, як для звичайної:

[`crm/../caseStatusConditionsCardStore.ts`](https://github.com/webitel/crm/blob/master/src/modules/configuration/modules/lookups/modules/statuses/modules/status-conditions/stores/card/caseStatusConditionsCardStore.ts)

```ts
import { CaseStatusConditionsAPI } from '@webitel/api-services/api';
import { WebitelCasesStatusCondition } from '@webitel/api-services/gen';
import { caseStatusConditionSchema as standardValidationSchema } from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';

import { CaseStatusConditionsNamespace } from '../../namespace';

export const useCaseStatusConditionsCardStore =
  createCardStore<WebitelCasesStatusCondition>({
    namespace: `${CaseStatusConditionsNamespace}/card`,
    apiModule: CaseStatusConditionsAPI,
    standardValidationSchema,
  });
```

`createCardStore` підтримує `parentId` — він передається в API при `get` / `add` / `update`.

## Popup component

[`crm/../opened-status-condition-popup.vue`](https://github.com/webitel/crm/blob/master/src/modules/configuration/modules/lookups/modules/statuses/modules/status-conditions/components/opened-status-condition-popup.vue)

```vue
<template>
  <wt-popup
    :shown="!!statusConditionId"
    @close="close"
  >
    <template #main>
      <wt-input-text
        v-model:model-value="modelValue.name"
        :regle-validation="validationSchema.r$.name"
      />
    </template>

    <template #actions>
      <wt-button
        :disabled="hasValidationErrors"
        @click="save"
      >
        {{ t('reusable.save') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script lang="ts" setup>
import { useNestedCardComponent } from '@webitel/ui-datalist/card'; // [!code highlight]
import { useClose } from '@webitel/ui-sdk/composables';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { useCaseStatusConditionsCardStore } from '../stores';

const emit = defineEmits(['load-data']);

const route = useRoute();

const {
  isNew,
  hasValidationErrors,
  save: saveItem,
} = useNestedCardComponent({ // [!code highlight]
  useCardStore: useCaseStatusConditionsCardStore,
  routeParamName: 'statusConditionId', // [!code highlight]
});

const { modelValue, validationSchema } = storeToRefs(
  useCaseStatusConditionsCardStore(),
);

const statusConditionId = computed(() => route.params.statusConditionId);

const { close } = useClose('status-conditions');

const save = async () => {
  await saveItem();
  close();
  emit('load-data');
};
</script>
```

## Що робить `useNestedCardComponent`

Обгортка над `useCardComponent` з `manualSetup: true`:

1. Читає ID вкладеного запису з `route.params[routeParamName]`
2. Читає `parentId` з `route.params.id`
3. Викликає `initialize({ itemId, parentId })` при відкритті карточки
4. Викликає `$reset()` при закритті (коли param зникає з URL)
5. Після створення нового запису — оновлює URL з `'new'` на server-assigned ID

Повертає **той самий набір**, що й `useCardComponent`:

```ts
const {
  modelValue,
  isNew,
  hasValidationErrors,
  validationFields,
  save,
  // ...
} = useNestedCardComponent({ ... });
```

## `useCardComponent` vs `useNestedCardComponent`

| | `useCardComponent` | `useNestedCardComponent` |
|---|---|---|
| Тип UI | full-page card | popup / nested route |
| `routeParamName` | `'id'` (default) | custom, напр. `'statusConditionId'` |
| `parentId` | не потрібен | автоматично з `route.params.id` |
| Init / reset | автоматично | через watch на route param |
| Popup close | — | `useClose` + `emit('load-data')` на клієнті |

## Lifecycle

```
Відкрили popup (/status-conditions/new)
  → routeId = 'new'
  → initialize({ itemId: null, parentId: 62 })
  → isNew = true

Зберегли
  → saveItem()
  → store.itemId = 789 (з response)
  → URL: /status-conditions/789

Закрили popup
  → routeId = undefined
  → $reset()

Unmount батьківського компонента
  → onUnmounted($reset) з useCardComponent
```
