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
import {endOfToday, startOfToday} from 'date-fns';
import {useI18n} from 'vue-i18n';
import {onMounted} from 'vue';

type ModelValue = {
  from: number;
  to: number;
};

const model = defineModel<ModelValue>();
const {t} = useI18n();

const handleInput = (key: keyof ModelValue, value: number) => {
  model.value = { ...model.value, [key]: value};
};

const initModel = () => {
  if (!model.value) {
    model.value = {from: startOfToday().getTime(), to: endOfToday().getTime()};
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
