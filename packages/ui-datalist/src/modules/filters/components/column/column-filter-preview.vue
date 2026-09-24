<template>
  <dynamic-filter-preview-info
    v-if="filter"
    class="column-filter-preview"
  >
    <template #header>
      {{ filterConfig.label }}
    </template>

    <template #default>
      <wt-loader
        v-if="!isRenderPreview"
        :size="ComponentSize.SM"
      />
      <component
        v-else
        :is="filterConfig.valuePreviewComponent"
        :filter="filter"
        :filter-config="filterConfig"
        :value="localValue"
      />
    </template>
  </dynamic-filter-preview-info>
</template>

<script lang="ts" setup>
import type { DataField } from '@webitel/api-services/gen/models';
import { WtLoader } from '@webitel/ui-sdk/components';
import type { WtTableHeader } from '@webitel/ui-sdk/components/wt-table/types/WtTable';
import { ComponentSize } from '@webitel/ui-sdk/enums';

import type { IFiltersManager } from '../../classes/FiltersManager';
import { useColumnFilter } from '../../composables/useColumnFilter';
import { useFilterValuePreview } from '../../composables/useFilterValuePreview';
import type { FilterHasReadAccess } from '@webitel/ui-sdk/modules/Userinfo';
import type { FilterConfigDefinition } from '../../modules/filterConfig/types/FilterConfigDefinition';
import DynamicFilterPreviewInfo from '../preview/dynamic-filter-preview-info.vue';

/**
 * Hover preview of an applied column filter (`column-filter` slot, `formView: false`):
 * the same "label + values" card the panel chip shows on hover.
 *
 * [WTEL-7727](https://webitel.atlassian.net/browse/WTEL-7727)
 */
const props = defineProps<{
	header: WtTableHeader;
	filtersManager: IFiltersManager;
	/** the page's filter definitions; a configured one is reused for the matching header */
	filterOptions?: FilterConfigDefinition[];
	/** custom (type extension) fields the table can filter by; matched to the header by field id */
	filterableExtensionFields?: DataField[];
	hasReadAccess?: FilterHasReadAccess;
}>();

const { filterConfig, filter } = useColumnFilter({
	header: () => props.header,
	filtersManager: () => props.filtersManager,
	filterOptions: () => props.filterOptions ?? [],
	filterableExtensionFields: () => props.filterableExtensionFields ?? [],
});

const { localValue, isRenderPreview } = useFilterValuePreview({
	filter,
	filterConfig,
});
</script>

<style lang="scss" scoped>
.wt-loader {
  margin: auto;
}
</style>
