<template>
  <template v-if="showLookupValuePreview">
    <lookup-filter-value-preview
      :value="props.value"
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
import LookupFilterValuePreview from '../_shared/lookup-filter-preview/lookup-filter-value-preview.vue';
import { ITypeExtensionFilterConfig } from './index';

const props = defineProps<DynamicFilterPreviewComponentProps & { filterConfig: ITypeExtensionFilterConfig }>();

const showLookupValuePreview = computed(() => {
  console.info(WtTypeExtensionFieldKind.Multiselect, WtTypeExtensionFieldKind.Select, props.filterConfig.field.kind);
  return [WtTypeExtensionFieldKind.Multiselect, WtTypeExtensionFieldKind.Select]
    .includes(props.filterConfig.field.kind);
});
</script>

<style scoped lang="scss">
</style>
