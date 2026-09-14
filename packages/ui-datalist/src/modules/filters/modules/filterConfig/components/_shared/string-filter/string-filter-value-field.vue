<template>
  <wt-input-text
    v-model:model-value="model"
    :label="t('webitelUI.filters.filterValue')"
    :v="!disableValidation && v$.model"
  />
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { computed, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';

type ModelValue = string;

const props = defineProps<{
	disableValidation?: boolean;
}>();

const model = defineModel<ModelValue>();
if (!model.value) {
	model.value = '';
}

const { t } = useI18n();

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
