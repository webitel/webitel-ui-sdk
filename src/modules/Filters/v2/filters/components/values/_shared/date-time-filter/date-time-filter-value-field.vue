<template>
  <div class="date-time-filter-value-field">
    <wt-datepicker
      :label="`${t('webitelUI.filters.createdAtFrom')}:`"
      :value="model?.from"
      class="date-time-filter-value-field__picker"
      mode="datetime"
      @input="handleInput('from', $event)"
    />

    <wt-datepicker
      :label="`${t('webitelUI.filters.createdAtTo')}:`"
      :value="model?.to"
      class="date-time-filter-value-field__picker"
      mode="datetime"
      @input="handleInput('to', $event)"
    />
  </div>
</template>

<script lang="ts" setup>
import { endOfToday, startOfToday } from 'date-fns';
import { useI18n } from 'vue-i18n';

type ModelValue = {
  from: number;
  to: number;
};

const model = defineModel<ModelValue>();
const { t } = useI18n();

const handleInput = (key: keyof ModelValue, value: number) => {
  const newValue = { ...model.value };
  newValue[key] = value;
  model.value = newValue;
};

const setDefaultValues = () => {
  if (!model.value?.from) {
    handleInput('from', startOfToday().getTime());
  }
  if (!model.value?.to) {
    handleInput('to', endOfToday().getTime());
  }
};
setDefaultValues();
</script>

<style lang="scss" scoped>
.date-time-filter-value-field {
  display: flex;
  flex-direction: column;
  grid-gap: var(--spacing-xs);
}
</style>
