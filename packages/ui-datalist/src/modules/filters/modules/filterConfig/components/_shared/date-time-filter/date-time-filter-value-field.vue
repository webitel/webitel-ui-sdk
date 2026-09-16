<template>
  <div class="date-time-filter-value-field">
    <wt-datepicker
      :label="`${t('webitelUI.filters.createdAtFrom')}:`"
      :model-value="model?.from"
      class="date-time-filter-value-field__picker"
      show-time
      required
      :v="v$.from"
      @update:model-value="handleInput('from', $event)"
    />

    <wt-datepicker
      :label="`${t('webitelUI.filters.createdAtTo')}:`"
      :model-value="model?.to"
      class="date-time-filter-value-field__picker"
      show-time
      required
      :v="v$.to"
      @update:model-value="handleInput('to', $event)"
    />
  </div>
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { endOfToday, startOfToday } from 'date-fns';
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';

type ModelValue = {
	from: number;
	to: number;
};

const emit = defineEmits<{
	'update:invalid': [
		boolean,
	];
}>();

const model = defineModel<ModelValue>({
	default: (): ModelValue => ({
		from: startOfToday().getTime(),
		to: endOfToday().getTime(),
	}),
});
const { t } = useI18n();

const from = computed(() => model.value?.from);
const to = computed(() => model.value?.to);

const v$ = useVuelidate(
	computed(() => ({
		from: {
			required,
		},
		to: {
			required,
		},
	})),
	{
		from,
		to,
	},
	{
		$autoDirty: true,
	},
);

v$.value.$touch();

watch(
	() => v$.value.$invalid,
	(invalid) => {
		emit('update:invalid', invalid);
	},
	{
		immediate: true,
	},
);

const handleInput = (key: keyof ModelValue, value: number) => {
	model.value = {
		...model.value,
		[key]: value,
	};
};
</script>

<style lang="scss" scoped>
.date-time-filter-value-field {
  display: flex;
  flex-direction: column;
  grid-gap: var(--spacing-xs);
}
</style>
