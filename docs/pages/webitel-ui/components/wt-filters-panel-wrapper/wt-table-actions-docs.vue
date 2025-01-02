<template>
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
  name: 'WtFiltersPanelWrapperDocs',
  data: () => ({
    events: [
      {
        value: 'reset',
        description: 'Filters reset click event',
      },
    ],
    slots: [
      {
        name: 'default',
        description: `Default content slot, used for filters addition. All elements inside this slot
        are built inside grid with 230px width size`,
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
