<template>
  <type-extension-value-field
    v-bind="attrs"
    v-model:model-value="model"
    :field="props.filterOption.extensionField"
  />
</template>

<script setup lang="ts">
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import {computed, useAttrs, watch} from "vue";

import {FilterOption} from "../../../enums/FilterOption";
import TypeExtensionValueField from "./type-extension-value-field.vue";

const model = defineModel<unknown>();

const props = defineProps<{
  filterOption: FilterOption;
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
