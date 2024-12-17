<template>
  <section class="dynamic-filter-add-action">
    <dynamic-filter-config-view>
      <template #activator>
        <wt-icon-action
          action="add"
        />
      </template>

      <template #content>
        <dynamic-filter-config-form
          :filter-options="props.filterOptions"
          @submit="onSubmit"
        />
      </template>
    </dynamic-filter-config-view>
  </section>
</template>

<script lang="ts" setup>
/**
 * Component-activator for adding a new filter
 */

import type { FilterInitParams } from "../../classes/Filter.class.ts";
import type { FilterSetupData } from "../../types/FilterSetup.type.ts";
import DynamicFilterConfigView from "./config/dynamic-filter-config-view.vue";
import DynamicFilterConfigForm from "./config/dynamic-filter-config-form.vue";
import WtIconAction from "../../../../../../components/wt-icon-action/wt-icon-action.vue";

interface Props {
  filterOptions: FilterSetupData[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'add:filter': [FilterInitParams],
}>();

const onSubmit = (payload: FilterInitParams) => {
  emit('add:filter', payload);
};
</script>

<style lang="scss" scoped>
//.dynamic-filter-add-action {}
</style>
