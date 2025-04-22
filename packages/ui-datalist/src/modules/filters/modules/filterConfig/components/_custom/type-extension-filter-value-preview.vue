<template>
  <template v-if="showLookupValuePreview">
    <lookup-value-preview
      :value="props.value"
    />
  </template>
  <template
    v-else-if="props.filterConfig.field.kind === WtTypeExtensionFieldKind.Boolean"
  >
    <has-option-value-preview
      :value="props.value"
    />
  </template>
  <template
    v-else-if="props.filterConfig.field.kind === WtTypeExtensionFieldKind.Calendar"
  >
    <date-time-value-preview
      :value="props.value * 1000 /* FIXME 😬😬😬 backend format -> frontend format conversion */"
    />
  </template>
  <template v-else>
    {{ props.value }}
  </template>
</template>

<script setup lang="ts">
import { WtTypeExtensionFieldKind } from '@webitel/ui-sdk/enums';
import { computed } from 'vue';

import { DynamicFilterPreviewComponentProps } from '../../types/DynamicFilterPreviewComponent';
import DateTimeValuePreview from '../_shared/date-time-filter/date-time-filter-value-preview.vue';
import HasOptionValuePreview from '../_shared/has-options/has-option-filter-value-preview.vue';
import LookupValuePreview from '../_shared/lookup-filter-preview/lookup-filter-value-preview.vue';
import { ITypeExtensionFilterConfig } from './index';

const props = defineProps<DynamicFilterPreviewComponentProps & { filterConfig: ITypeExtensionFilterConfig }>();

const showLookupValuePreview = computed(() => {
  return [WtTypeExtensionFieldKind.Multiselect, WtTypeExtensionFieldKind.Select]
    .includes(props.filterConfig.field.kind);
});
</script>

<style scoped lang="scss">
</style>
