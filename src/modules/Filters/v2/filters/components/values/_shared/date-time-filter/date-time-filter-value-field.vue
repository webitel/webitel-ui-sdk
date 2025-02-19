<template>
  <div class="date-time-filter-value-field">
    <wt-datepicker
      :value="model.from"
      :label="`${t('webitelUI.filters.createdAtFrom')}:`"
      mode="datetime"
      class="date-time-filter-value-field__picker"
      @input="handleInput('from', $event)"
    />

    <wt-datepicker
      :value="model.to"
      :label="`${t('webitelUI.filters.createdAtTo')}:`"
      mode="datetime"
      class="date-time-filter-value-field__picker"
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
