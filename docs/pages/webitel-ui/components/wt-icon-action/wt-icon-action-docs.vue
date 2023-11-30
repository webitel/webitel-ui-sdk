<template>
  <component-props
    :properties="properties"
  />
  <component-events
    :events="events"
  />
</template>

<script setup>
import Prism from 'prismjs';
import { onMounted } from 'vue';

const properties = [
  {
    value: 'action',
    type: 'String',
    required: true,
    options: ['delete', 'edit', 'add', 'history', 'download', 'refresh'],
  },
  {
    value: 'disabled',
    code: '<wt-icon-action disabled></wt-icon-action>',
    type: 'Boolean',
    default: 'false',
  },
];

const events = [
  { value: 'click' },
];

onMounted(() => Prism.highlightAll());
</script>

<style lang="scss" scoped>
</style>
