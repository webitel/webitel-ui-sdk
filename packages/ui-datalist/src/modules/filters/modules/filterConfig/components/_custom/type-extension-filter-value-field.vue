<template>
  <type-extension-value-field
    v-bind="attrs"
    v-model:model-value="model"
    :field="props.filterConfig.field"
  >
    <template #[ExtensionFieldType.Select]="{ defaultProps }">
      <wt-select
        v-bind="defaultProps"
        :value="model ?? [] /* so that component won't break when model is nullish at init */"
        :search-method="(...params) => props.filterConfig.searchRecords(...params)"
        use-value-from-options-by-prop="id"
        @input="model = $event"
      />
    </template>
  </type-extension-value-field>
</template>

<script setup lang="ts">
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import { WtSelect } from '@webitel/ui-sdk/components';
import {computed, useAttrs, watch} from "vue";

// DO NOT REMOVE THIS IMPORT!! : Webstorm lies you, import is used for dynamic slot computation
import { ExtensionFieldType } from "./FieldType";
import {ITypeExtensionFilterConfig} from "./index";
import TypeExtensionValueField from "./type-extension-value-field.vue";

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
