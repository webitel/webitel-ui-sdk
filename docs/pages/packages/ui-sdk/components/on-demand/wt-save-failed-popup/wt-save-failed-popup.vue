<template>
  <component-events :events="events" />
</template>

<script>
import Prism from 'prismjs';
export default {
  name: 'FlowSaveFailedPopupDocs',
  data() {
    return {
      events: [
        {
          value: 'close-popup',
          description: 'Needed to close popup',
        },
        {
          value: 'save',
          description: 'Fires at "Retry" button inside popup',
        },
        {
          value: 'download',
          description: 'Fires at "Export to JSON" button inside popup',
        },
      ],
    };
  },
  mounted() {
    Prism.highlightAll();
  },
};
</script>

<style lang="scss" scoped></style>
