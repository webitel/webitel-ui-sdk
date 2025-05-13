<template>
  <template v-if="showLookupValuePreview">
    <lookup-filter-value-preview :value="props.value" />
  </template>
  <template
    v-else-if="
      props.filterConfig.field.kind === WtTypeExtensionFieldKind.Boolean
    "
  >
    <has-option-filter-value-preview :value="props.value" />
  </template>
  <template
    v-else-if="
      props.filterConfig.field.kind === WtTypeExtensionFieldKind.Calendar
    "
  >
    <date-time-options-filter-value-preview :value="props.value" />
  </template>
  <template v-else>
    {{ props.value }}
  </template>
</template>

<script setup lang="ts">
import { WtTypeExtensionFieldKind } from '@webitel/ui-sdk/enums';
import { computed } from 'vue';

import { DynamicFilterPreviewComponentProps } from '../../types/DynamicFilterPreviewComponent';
import DateTimeOptionsFilterValuePreview from '../_shared/date-time-filter/date-time-options/date-time-options-filter-value-preview.vue';
import HasOptionFilterValuePreview from '../_shared/has-options/has-option-filter-value-preview.vue';
import LookupFilterValuePreview from '../_shared/lookup-filter-preview/lookup-filter-value-preview.vue';
import { ITypeExtensionFilterConfig } from './index';

const props = defineProps<
  DynamicFilterPreviewComponentProps & {
    filterConfig: ITypeExtensionFilterConfig;
  }
>();

const showLookupValuePreview = computed(() => {
  return [
    WtTypeExtensionFieldKind.Multiselect,
    WtTypeExtensionFieldKind.Select,
  ].includes(props.filterConfig.field.kind);
});
</script>

<style scoped lang="scss"></style>
