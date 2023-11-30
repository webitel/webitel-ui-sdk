<template>
  <component-props
    :properties="properties"
  />
  <component-slots
    :slots="slots"
  />

</template>

<script setup>
import Prism from 'prismjs';
import { onMounted } from 'vue';

const properties = [
  {
    value: 'primaryText',
    type: 'String',
    code: '<wt-page-header :primary-text="text"></wt-page-header>',
    description: 'Text for primary button. If empty - the title "ADD"',
  },
  {
    value: 'primaryAction',
    type: 'Function',
    code: '<wt-page-header :primary-action="create"></wt-page-header>',
  },
  {
    value: 'primaryDisabled',
    type: 'Boolean',
    default: false,
    code: '<wt-page-header primary-disabled></wt-page-header>',
  },
  {
    value: 'hidePrimary',
    type: 'Boolean',
    default: false,
    code: '<wt-page-header hide-primary></wt-page-header>',
  },
  {
    value: 'secondaryText',
    type: 'String',
    code: '<wt-page-header :secondary-text="text"></wt-page-header>',
    description: 'Text for secondary button. If empty - the title "CLOSE"',
  },
  {
    value: 'secondaryAction',
    type: 'Function',
    code: '<wt-page-header :secondary-action="close"></wt-page-header>',
  },
  {
    value: 'secondaryDisabled',
    type: 'Boolean',
    default: false,
    code: '<wt-page-header secondary-disabled></wt-page-header>',
  },
  {
    value: 'hideSecondary',
    type: 'Boolean',
    default: false,
    code: '<wt-page-header hide-secondary></wt-page-header>',
  },
];
const slots = [
  {
    name: 'title',
    description: 'Title slot',
  },
  {
    name: 'actions',
    description: 'Action buttons slot',
  },
];

onMounted(() => Prism.highlightAll());
</script>

<style scoped>

</style>
