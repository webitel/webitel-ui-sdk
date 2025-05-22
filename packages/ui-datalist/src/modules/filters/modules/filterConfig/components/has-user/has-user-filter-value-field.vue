<template>
  <has-option-filter-value-field
    :clearable="filterConfig.clearable"
    :hide-label="filterConfig.hideLabel"
    :model-value="model"
    :placeholder="filterConfig.label"
    :v="v$?.model"
    @update:model-value="model = $event"
  />
</template>

<script lang="ts" setup>
import { watch } from 'vue';

import { useBooleanFilterValueValidation } from '../../composables/booleanFilterToolkit';
import HasOptionFilterValueField from '../_shared/has-options/has-option-filter-value-field.vue';
import {BooleanFilterModelValue} from "../../enums/options/BooleanFilterOptions";
import { IHasUserFilterConfig } from './index';

const props = defineProps<{
  filterConfig: IHasUserFilterConfig;
}>();

const model = defineModel<BooleanFilterModelValue>();

let v$: ReturnType<typeof useBooleanFilterValueValidation>['v$'] | null = null;

if (!props.filterConfig?.noValidation) {
  ({ v$ } = useBooleanFilterValueValidation(model));
}

const emit = defineEmits<{
  'update:invalid': [boolean];
}>();

watch(
  () => v$?.value?.$invalid,
  (invalid) => {
    if (v$?.value) emit('update:invalid', invalid);
  },
  { immediate: true },
);
</script>

<style scoped></style>
