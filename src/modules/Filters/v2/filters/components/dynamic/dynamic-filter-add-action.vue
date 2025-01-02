<template>
  <dynamic-filter-config-view>
    <template #activator>
      <wt-icon-action action="add" />
    </template>

    <template #content>
      <slot name="form"> filter form should be here </slot>
    </template>
  </dynamic-filter-config-view>
</template>

<script lang="ts" setup>
import DynamicFilterConfigView from './config/dynamic-filter-config-view.vue';
import WtIconAction from '../../../../../../components/wt-icon-action/wt-icon-action.vue';
</script>

<style lang="scss" scoped>
//.dynamic-filter-add-action {}
</style>
