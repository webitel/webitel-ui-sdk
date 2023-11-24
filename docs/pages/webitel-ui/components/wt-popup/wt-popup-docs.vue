<template>
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
  name: 'WtPopupDocs',
  data: () => ({
    properties: [
      {
        value: 'minWidth',
        type: 'Number, String',
        description: 'sets min-width style value to popup container',
      },
      {
        value: 'width',
        type: 'Number, String',
        description: 'sets width style value to popup container',
      },
      {
        value: 'overflow',
        type: 'Boolean',
        default: 'false',
        description: 'If true, popup has overflow: "visible"',
      },
    ],
    events: [
      {
        value: 'close',
      },
    ],
    slots: [
      {
        name: 'header',
        description: 'popup header slot',
      },
      {
        name: 'title',
        description: 'title text slot inside h3 in header, if header slot wasn\'t passed)',
      },
      {
        name: 'main',
        description: 'popup main content slot',
      },
      {
        name: 'actions',
        description: 'popup actions slot',
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
