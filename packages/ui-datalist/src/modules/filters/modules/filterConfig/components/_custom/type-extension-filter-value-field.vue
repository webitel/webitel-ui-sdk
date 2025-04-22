<template>
  <wt-type-extension-value-input
    v-bind="attrs"
    v-model:model-value="model"
    :field="props.filterConfig.field"
  >
    <template #[WtTypeExtensionFieldKind.Select]="{ defaultProps }">
      <wt-select
        v-bind="defaultProps"
        :value="model ?? [] /* so that component won't break when model is nullish at init */"
        :search-method="(...params) => props.filterConfig.searchRecords(...params)"
        use-value-from-options-by-prop="id"
        @input="model = $event"
      />
    </template>
    <template #[WtTypeExtensionFieldKind.Multiselect]="{ defaultProps }">
      <wt-select
        v-bind="defaultProps"
        :value="model ?? [] /* so that component won't break when model is nullish at init */"
        :search-method="(...params) => props.filterConfig.searchRecords(...params)"
        use-value-from-options-by-prop="id"
        @input="model = $event"
      />
    </template>
  </wt-type-extension-value-input>
</template>

<script setup lang="ts">
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import { WtSelect, WtTypeExtensionValueInput } from '@webitel/ui-sdk/components';
import { WtTypeExtensionFieldKind } from '@webitel/ui-sdk/enums'; // DO NOT REMOVE THIS IMPORT!! : Webstorm lies you, import is used for dynamic slot computation
import {computed, useAttrs, watch} from "vue";

import {ITypeExtensionFilterConfig} from "./index";

const model = defineModel<unknown>();

const props = defineProps<{
  filterConfig: ITypeExtensionFilterConfig;
}>();

const emit = defineEmits<{
  'update:invalid': [boolean];
}>();

const attrs = useAttrs();

const v$ = useVuelidate(
  computed(() => ({
    model: {
      required,
    },
  })),
  { model },
  { $autoDirty: true },
);

watch(
  () => v$.value.$invalid,
  (invalid) => {
    emit('update:invalid', invalid);
  },
  { immediate: true },
);
</script>

<style scoped>

</style>
