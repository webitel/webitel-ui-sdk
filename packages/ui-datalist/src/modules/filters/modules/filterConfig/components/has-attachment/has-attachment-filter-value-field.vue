<template>
  <has-option-filter-value-field
    :model-value="model"
    :v="!disableValidation && v$.model"
    @update:model-value="model = $event"
  />
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { computed, onMounted, watch } from 'vue';

import HasOptionFilterValueField from '../_shared/has-options/has-option-filter-value-field.vue';

const props = defineProps<{
	disableValidation?: boolean;
}>();

const model = defineModel<boolean | null>();

const v$ = useVuelidate(
	computed(() => ({
		model: {
			required,
		},
	})),
	{
		model,
	},
	{
		$autoDirty: true,
	},
);

v$.value.$touch();

onMounted(() => {
	if (!props?.disableValidation) v$.value.$touch();
});

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
