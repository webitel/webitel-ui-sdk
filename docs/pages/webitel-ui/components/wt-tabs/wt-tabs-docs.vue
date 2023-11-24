<template>
  <component-model
    event="change"
    prop="current"
  />
  <component-props
    :properties="properties"
  />
  <component-events
    :events="events"
  />
  <component-slots
    :slots="slots"
  />
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'WtTabsDocs',
  data: () => ({
    properties: [
      {
        value: 'current',
        code: '<wt-tabs :current="{text: `TAB_TEXT`, value: `tab1`}"></wt-tabs>',
        type: 'Object',
        default: '{}',
      },
      {
        value: 'tabs',
        code: '<wt-tabs :tabs="[{text: `TAB_TEXT`, value: `tab1`}, {text: `TAB_TEXT2`, value: `tab2`}]"></wt-tabs>',
        type: 'Array',
        default: '[]',
      },
    ],
    events: [
      {
        value: 'change',
        params: [
          { name: 'tab', type: 'Object', description: 'Returns tab object from list of tabs' },
        ],
      },
    ],
    slots: [
      {
        name: ':tab-value',
        scope: [{ name: 'tab' }, { name: 'current' }],
        description: 'Custom tab contents slot',
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
