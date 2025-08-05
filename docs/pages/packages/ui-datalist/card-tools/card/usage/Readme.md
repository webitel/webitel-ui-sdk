# Card Tools: Usage

На прикладі карточки розділу в crm'ці.

## Creating a store

[`crm/../caseSourcesCardStore.ts`](https://github.com/webitel/crm/blob/master/src/modules/configuration/modules/lookups/modules/sources/stores/card/caseSourcesCardStore.ts)

```ts
// crm/../caseSourcesCardStore.ts

import { CaseSourcesAPI } from '@webitel/api-services/api';
import {createSourceBody as standardValidationSchema} from "@webitel/api-services/gen"; // [!code highlight]
import { WebitelCasesSource } from "@webitel/api-services/gen";
import {createCardStore} from "@webitel/ui-datalist/card"; // [!code highlight]

import { CaseSourcesNamespace } from "../../namespace"; // pinia namespace

export const useCaseSourcesCardStore = createCardStore<WebitelCasesSource>({ // [!code highlight]
    namespace: `${CaseSourcesNamespace}/card`,
    apiModule: CaseSourcesAPI,
    standardValidationSchema, // NOTE! //  [!code highlight]
});
```

## Using composables

### Tabs-wrapper component

[`crm/../opened-source.vue`](https://github.com/webitel/crm/blob/master/src/modules/configuration/modules/lookups/modules/sources/components/opened-source.vue)

```ts
// opened-source.vue

<template>
    // ...
  <router-view v-slot="{ Component }">
    <component // tabs component!
      :is="Component"
      v-model="modelValue"  // [!code highlight]
      :validation-fields="validationFields" // [!code highlight]
      :access="{ ... }"
    />
  </router-view>
    // ...
</template>

<script lang="ts" setup>
    // ...
import { useCardComponent } from '@webitel/ui-datalist/card'; // [!code highlight]

import { useCaseSourcesCardStore } from '../stores'; // [!code highlight]
import {WebitelCasesSource} from "@webitel/api-services/gen";

// ...

const {
    // models
    modelValue, // [!code highlight]

    // state
    debouncedIsLoading,
    originalItemInstance, // readonly! [!code highlight]

    // computed
    isNew,
    saveText,
    hasValidationErrors,
    isAnyFieldEdited,
    validationFields,

    // actions
    save,
} = useCardComponent<WebitelCasesSource>({ // [!code highlight]
    useCardStore: useCaseSourcesCardStore, // [!code highlight]
});
// ...
</script>
```

### Tab component

[`crm/../opened-source-general.vue`](https://github.com/webitel/crm/blob/master/src/modules/configuration/modules/lookups/modules/sources/components/opened-source-general.vue)

```ts
// opened-source-general.vue

<template>
    // ...
    <wt-input
        v-model="modelValue.name" //note: v-model is preffered [!code highlight]
        :label="t('reusable.name')"
        :regle-validation="validationFields?.name" //note: prop name [!code highlight]
        :disabled="disableUserInput"
        required 
    />
        
    <wt-select
        v-model="modelValue.type"
        :label="t('vocabulary.type')"
        :options="typesSourcesOptions"
        :regle-validation="validationFields?.type"
        :disabled="disableUserInput"
        use-value-from-options-by-prop="id"
        required
    />
    // ...
<template>

<script lang="ts" setup>
    import {RegleSchemaFieldStatus} from '@regle/schemas';
    import {WebitelCasesSourceType} from '@webitel/api-services/gen/models'; // [!code highlight]
    import {WebitelCasesSource} from '@webitel/api-services/gen/models';
    import {WtInput, WtSelect} from '@webitel/ui-sdk/components';
    
    // ...

    const modelValue = defineModel<WebitelCasesSource>(); // [!code highlight]
    
    defineProps<{ // [!code highlight]
        validationFields: { // [!code highlight]
            /* keys as in CaseSource, but values are Regle schema objects */
            [K in keyof WebitelCasesSource]: RegleSchemaFieldStatus<WebitelCasesSource[K]> // [!code highlight]
        };
    }>();
    
    // ...
</script>    
```