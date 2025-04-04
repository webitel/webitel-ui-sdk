<template>
  <div class="created-at-filter-value-field">
    <wt-radio
      v-for="(value) of radioOpts"
      :key="value"
      v-model="selectedRadioValue"
      :label="t(`webitelUI.filters.datetime.${value}`)"
      :value="value"
      @input="handleRadioChange"
    />
    <wt-datepicker
      v-if="showDatepickers"
      :value="model.from"
      :label="t('reusable.from')"
      mode="datetime"
      @input="changeAbsoluteValue($event, 'from')"
    />
    <wt-datepicker
      v-if="showDatepickers"
      :value="model.to"
      :label="t('reusable.to')"
      mode="datetime"
      @input="changeAbsoluteValue($event, 'to')"
    />
  </div>
</template>

<script lang="ts" setup>
import { WtRadio } from '@webitel/ui-sdk/components';
import {RelativeDatetimeValue} from "@webitel/ui-sdk/enums";
import {endOfToday, startOfToday} from 'date-fns';
import {computed, ref} from "vue";
import {useI18n} from 'vue-i18n';

const model = defineModel<RelativeDatetimeValue | { 'from': number, 'to': number }>();

const {t} = useI18n();

const radioOpts = [
  RelativeDatetimeValue.Today,
  RelativeDatetimeValue.ThisWeek,
  RelativeDatetimeValue.ThisMonth,
  RelativeDatetimeValue.Custom,
];

const selectedRadioValue = ref();

const initialize = () => {
  if (!model.value) { /* initialize */
    selectedRadioValue.value = radioOpts[0];
    model.value = selectedRadioValue.value;
  }
  else if (typeof model.value === 'string') { /* RelativeDatetimeValue */
    selectedRadioValue.value = model.value;
  } else { /* { from, to } */
    selectedRadioValue.value = RelativeDatetimeValue.Custom;
  }
};

initialize();

const showDatepickers = computed(() => {
  return selectedRadioValue.value === RelativeDatetimeValue.Custom;
});

const handleRadioChange = (value: RelativeDatetimeValue) => {
  if (value === RelativeDatetimeValue.Custom) {
    model.value = {
      from: startOfToday().getTime(),
      to: endOfToday().getTime(),
    };
  } else {
    model.value = value;
  }
};

const changeAbsoluteValue = (value: number, prop: 'from' | 'to') => {
  const newModelValue = {
    ...model.value as { 'from': number, 'to': number },
    [prop]: value,
  };

  model.value = newModelValue;
};
</script>

<style scoped>
.created-at-filter-value-field {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}
</style>
