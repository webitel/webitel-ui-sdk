<template>
  <div class="date-time-filter-value-field">
    <wt-datepicker
      :label="`${t('webitelUI.filters.createdAtFrom')}:`"
      :model-value="model?.from"
      class="date-time-filter-value-field__picker"
      show-time
      @update:model-value="handleInput('from', $event)"
    />

    <wt-datepicker
      :label="`${t('webitelUI.filters.createdAtTo')}:`"
      :model-value="model?.to"
      class="date-time-filter-value-field__picker"
      show-time
      @update:model-value="handleInput('to', $event)"
    />
  </div>
</template>

<script lang="ts" setup>
import { endOfToday, startOfToday } from 'date-fns';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

type ModelValue = {
	from: number;
	to: number;
};

const model = defineModel<ModelValue>();
const { t } = useI18n();

const handleInput = (key: keyof ModelValue, value: number) => {
	model.value = {
		...model.value,
		[key]: value,
	};
};

const initModel = () => {
	if (!model.value) {
		model.value = {
			from: startOfToday().getTime(),
			to: endOfToday().getTime(),
		};
	}
};

onMounted(() => initModel());
</script>

<style lang="scss" scoped>
.date-time-filter-value-field {
  display: flex;
  flex-direction: column;
  grid-gap: var(--spacing-xs);
}
</style>
