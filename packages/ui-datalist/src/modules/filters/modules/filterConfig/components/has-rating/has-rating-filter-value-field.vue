<template>
  <has-option-filter-value-field
    :model-value="model"
    :v="v$.model"
    @update:model-value="model = $event"
  />
</template>

<script lang="ts" setup>
import { watch } from 'vue';

import { useBooleanFilterValueValidation } from '../../composables/booleanFilterToolkit';
import { BooleanFilterModelValue } from '../../enums/options/BooleanFilterOptions';
import HasOptionFilterValueField from '../_shared/has-options/has-option-filter-value-field.vue';

// `null` is what the shared has-option field writes when the selection is cleared.
const model = defineModel<BooleanFilterModelValue | null>();

const { v$ } = useBooleanFilterValueValidation<BooleanFilterModelValue>(model);

const emit = defineEmits<{
	'update:invalid': [
		boolean,
	];
}>();

watch(
	() => v$.value.$invalid,
	(invalid) => {
		emit('update:invalid', invalid);
	},
	{
		immediate: true,
	},
);
</script>

<style scoped></style>
