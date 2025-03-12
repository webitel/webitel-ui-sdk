<template>
  <div class="save-preset-filters-preview">
    <wt-label>
      {{ t('webitelUI.filters.filterName') }}
    </wt-label>
    <dynamic-filter-panel-wrapper>
      <template #filters>
        <dynamic-filter-preview
          v-for="(filter) of props.filters"
          :key="filter.name"
          :filter="filter"
          dummy
        >
          <template #info>
            <component
              :is="getFilterFieldComponent(filter.name, 'previewField')"
              :value="filter.value"
            >
            </component>
          </template>
        </dynamic-filter-preview>
      </template>
    </dynamic-filter-panel-wrapper>
  </div>

</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
import DynamicFilterPreview
  from "../../../filters/components/preview/dynamic-filter-preview.vue";
import DynamicFilterPanelWrapper
  from "../../../filters/components/dynamic-filter-panel-wrapper.vue";
import type {IFilter} from "../../../filters/types/Filter.d.ts";
import {getFilterFieldComponent} from "../../../filters/components/values/filterComponentsMap";

type Props = {
  filters: IFilter[];
};

const props = defineProps<Props>();

const { t } = useI18n();

</script>

<style scoped lang="scss">
.preset-filters-preview {

}
</style>
