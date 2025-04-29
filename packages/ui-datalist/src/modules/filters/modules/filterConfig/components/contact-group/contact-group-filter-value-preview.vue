<template>
  <lookup-filter-value-preview v-bind="{ ...props, value: shownValue }" />
</template>

<script lang="ts" setup>
import {computed} from "vue";
import { useI18n } from 'vue-i18n';
import { WebitelContactsContact } from 'webitel-sdk';

import {IFilter} from "../../../../classes/Filter";
import LookupFilterValuePreview from '../_shared/lookup-filter-preview/lookup-filter-value-preview.vue';

const props = defineProps<{
  value: WebitelContactsContact[];
  filter: IFilter,
}>();

const { t } = useI18n();

const rawValue = computed(() => {
  return props.filter.value;
});

const shownValue = computed(() => {
  const shownValue = [...props.value];
  if (rawValue.value.unassigned) {
    shownValue.unshift({
      name: t('reusable.unassigned'),
      id: 'unassigned',
    });
  }
  return shownValue;
});
console.log('shownValue', shownValue.value);
</script>

<style scoped></style>
