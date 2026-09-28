<template>
  <has-option-filter-value-field
    :filter-config="filterConfig"
    :model-value="model"
    :v="v$?.model"
    @update:model-value="model = $event"
  />
</template>

<script lang="ts" setup>
import { watch } from 'vue';

import { WtSysTypeFilterConfig } from '../../classes/FilterConfig';
import { useBooleanFilterValueValidation } from '../../composables/booleanFilterToolkit';
import { BooleanFilterModelValue } from '../../enums/options/BooleanFilterOptions';
import HasOptionFilterValueField from '../_shared/has-options/has-option-filter-value-field.vue';

const props = defineProps<{
	filterConfig?: WtSysTypeFilterConfig;
	disableValidation?: boolean;
}>();

const model = defineModel<BooleanFilterModelValue | null>();

let v$: ReturnType<typeof useBooleanFilterValueValidation>['v$'] | null = null;
if (!props.disableValidation) {
	({ v$ } = useBooleanFilterValueValidation(model));
}

const emit = defineEmits<{
	'update:invalid': [
		boolean,
	];
}>();

watch(
	() => v$?.value?.$invalid,
	(invalid) => {
		if (v$?.value) {
			emit('update:invalid', !!invalid);
		}
	},
	{
		immediate: true,
	},
);
</script>

<style scoped></style>
