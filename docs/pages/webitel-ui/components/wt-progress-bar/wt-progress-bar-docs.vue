<template>
  <component-props
    :properties="properties"
  />
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'WtProgressBarDocs',
  data: () => ({
    properties: [
      {
        value: 'max',
        code: '<wt-progress-bar :max="10"></wt-progress-bar>',
        type: ['Number', 'String'],
        default: '100',
        description: 'Max progress bar value',
      },
      {
        value: 'value',
        code: '<wt-progress-bar :value="10"></wt-progress-bar>',
        type: ['Number', 'String'],
        description: 'Current progress bar value',
      },
      {
        value: 'color',
        code: '<wt-progress-bar color="success"></wt-progress-bar>',
        type: 'String',
        options: ['primary', 'secondary', 'success', 'error'],
        description: 'Progress color',
      },
    ],
  }),
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style lang="scss" scoped>
</style>
