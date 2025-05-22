<template>
  <dynamic-filter-panel-wrapper>
    <template #filters>
      <dynamic-filter-preview-new
        v-for="({ filter, filterConfig }) of appliedFilterToFilterConfigMappings"
        :key="filter.name"
        :filter="filter"
        :filter-config="filterConfig"
        disable-click-away
        @update:filter="emit('filter:update', $event)"
        @delete:filter="emit('filter:delete', filter)"
      />
    </template>

    <template #actions>
      <wt-icon-action
        :disabled="!hasAnyFilterValue"
        action="clear"
        @click="emit('filter:reset-all')"
      />
    </template>
  </dynamic-filter-panel-wrapper>
</template>

<script lang="ts" setup>
// Відмінність від основного компонента?
// 1) нема пресетів, та пропсів для них
// 2) простіше розмітка
// 3) додала стилі (бо там в середині dynamic-filter-panel-wrapper ширина селектів низначена як 300px)

import { WtIconAction } from '@webitel/ui-sdk/components';
import {FilterData, IFilter} from "../classes/Filter";
import {IFiltersManager} from "../classes/FiltersManager";
import {useFilterConfigsToolkit} from "../composables/useFilterConfigsToolkit";
import {AnyFilterConfig} from "../modules/filterConfig/classes/FilterConfig";
import { FilterOption } from '../modules/filterConfig/enums/FilterOption';
import DynamicFilterPanelWrapper from './dynamic-filter-panel-wrapper.vue';
import { computed } from 'vue';
import DynamicFilterPreviewNew from './dynamic-filter-preview-new.vue';

type Props = {
  filterOptions: (FilterOption | AnyFilterConfig)[];
  filtersManager: IFiltersManager;
};

const props = defineProps<Props>();

const emit = defineEmits<{
  'filter:add': [FilterData];
  'filter:update': [FilterData];
  'filter:delete': [IFilter];
  'filter:reset-all': [];
  'preset:apply': [string];
  hide: [];
}>();

// Чому для disabled іконки для очистки фільтрів не підходить props.filtersManager.filters.size
// в моєму випадку? Бо я в старій версії фільтрів filtersManager має фільтри тільки ті що визначені юзером,
// у моїй версії я одразу заповнюю filtersManager фільтрами які треба намалювати, тільки без значень.
// Тому треба аналізувати чи є саме значення

const hasAnyFilterValue = computed(() => {
  return [...props.filtersManager.filters.values()].some(
    (filter: any) => filter?.value !== undefined
  )
})

const {
  appliedFilterToFilterConfigMappings,
} = useFilterConfigsToolkit({
  filterOptions: props.filterOptions,
  filtersManager: props.filtersManager,
});

</script>

<style scoped>
:deep(.dynamic-filter-panel-wrapper) {
  align-items: center;
}

:deep(.dynamic-filter-panel-wrapper__filters) {
  display: flex;
  flex-wrap: nowrap;
  grid-gap: var(--spacing-xs);
}

:deep(.dynamic-filter-config-form) {
  width: 100%;
}
</style>
