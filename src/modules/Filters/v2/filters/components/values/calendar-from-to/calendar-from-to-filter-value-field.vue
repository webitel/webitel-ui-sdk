<template>
  <div class="calendar-from-to-filter-value-field">
    <wt-datepicker
      v-if="model.from"
      :value="model.from"
      :label="`${t('webitelUI.filters.filterCalendarFrom')}:`"
      @input="model.from = $event"
    />

    <wt-datepicker
      v-if="model.to"
      :value="model.to"
      :label="`${t('webitelUI.filters.filterCalendarTo')}:`"
      @input="model.to = $event"
    />
  </div>
</template>

<script lang="ts" setup>
import { startOfToday } from 'date-fns';
import { useI18n } from 'vue-i18n';

type ModelValue = {
  from: number;
  to: number;
};
const model = defineModel<ModelValue>();

const { t } = useI18n();

const setDefaultValues = () => {
  if (!model.value?.to) {
    model.value.to = startOfToday().getTime();
  }
  if (!model.value?.from) {
    model.value.from = startOfToday().getTime();
  }
};

setDefaultValues();
</script>

<style lang="scss" scoped></style>
