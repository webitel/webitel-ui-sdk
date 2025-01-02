<template>
  <component-props
    :properties="properties"
  />
  <component-events
    :events="events"
  />
</template>

<script>
import Prism from 'prismjs';

export default {
  name: 'WtErrorPageDocs',
  data: () => ({
    properties: [
      {
        name: 'type',
        code: '<wt-error-page type="404"></wt-error-page>',
        required: true,
        type: String,
        options: ['404', '403'],
        description: 'Error type',
      },
    ],
    events: [
      {
        name: 'back',
        description: '"back" button click event',
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
